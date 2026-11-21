import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Xabar kiritilmadi' }, { status: 400 });
    }

    const lowerMsg = message.toLowerCase();

    // Check if an external Gemini API key is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Siz MetaITSchool IT akademiyasining rasmiy intellektual ta'lim assistentisiz. O'quvchilarga o'zbek tilida dasturlash, kurslar, vazifalar va zamonaviy texnologiyalar bo'yicha do'stona, aniq va professional maslahat bering. Foydalanuvchi savoli: ${message}`,
                  },
                ],
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.error('Gemini API fetch error, falling back to smart local assistant:', err);
      }
    }

    // Intelligent built-in knowledge engine for MetaITSchool
    let reply = '';

    if (lowerMsg.includes('kurs') || lowerMsg.includes('narx') || lowerMsg.includes('o\'qish') || lowerMsg.includes('qabul')) {
      reply = `**MetaITSchool Kurslari va Qabul Jarayoni:**\n\nBizda quyidagi asosiy yo'nalishlar mavjud:\n1. **Full Stack JavaScript & Next.js Pro** (6 oy, 1,800,000 so'm/oy) — React 19, TypeScript, Next.js 14, Node.js.\n2. **Python, Sun'iy Intellekt va Data Science** (7 oy, 1,950,000 so'm/oy) — PyTorch, Machine Learning, LLM tizimlari.\n3. **Professional UI/UX & Product Design** (5 oy, 1,650,000 so'm/oy) — Figma, Design Systems, UX research.\n4. **Flutter & Cross-Platform Mobile** (6 oy, 1,750,000 so'm/oy) — iOS va Android.\n5. **Kiberxavfsizlik & Axborot Himoyasi** (6 oy, 2,100,000 so'm/oy).\n\nKursga yozilish uchun saytning **"Ariza topshirish"** (/apply) sahifasi orqali ma'lumotlaringizni qoldirishingiz mumkin!`;
    } else if (lowerMsg.includes('javascript') || lowerMsg.includes('react') || lowerMsg.includes('typescript') || lowerMsg.includes('next.js')) {
      reply = `**Frontend va JavaScript haqida:**\n\nJavaScript — zamonaviy vebning eng muhim tili. React 19 va Next.js 14 App Router arxitekturasi orqali Server Components, Streaming va Server Actions kabi ilg'or texnologiyalardan foydalanamiz.\n\nMaslahat: Har doim o'zgaruvchilar va komponentlarda qat'iy **TypeScript** turlaridan foydalaning — bu loyihangiz sifatini 3 barobarga oshiradi!`;
    } else if (lowerMsg.includes('python') || lowerMsg.includes('ai') || lowerMsg.includes('sun\'iy intellekt')) {
      reply = `**Sun'iy Intellekt & Python:**\n\nPython sun'iy intellekt va ma'lumotlar tahlili uchun 1-raqamli til hisoblanadi. Pandas, NumPy, Scikit-learn va PyTorch kutubxonalari orqali o'quvchilarimiz real neyron to'rlari va generativ AI agentlarini qurishni o'rganadilar. Savolingiz bo'yicha kod misolini ko'rsatishimni xohlaysizmi?`;
    } else if (lowerMsg.includes('admin') || lowerMsg.includes('parol') || lowerMsg.includes('login')) {
      reply = `**Administrator Tizimi:**\n\nMetaITSchool tizimida faqatgina 3 nafar vakolatli administrator hisobi mavjud:\n- \`fazliddin\`\n- \`yaxyobek\`\n- \`jasurbek\`\n\nBoshqa har qanday foydalanuvchi nomi admin paneliga kirishda avtomatik ravishda rad etiladi. O'quvchilar va o'qituvchilar esa o'z portallari (/auth/login) orqali kirishadi.`;
    } else if (lowerMsg.includes('sertifikat') || lowerMsg.includes('tekshirish') || lowerMsg.includes('verify')) {
      reply = `**Sertifikatlar va Tasdiqlash:**\n\nHar bir bitiruvchimizga unikal QR-kodli va raqamli identifikatorga ega (masalan: \`META-2026-9481\`) rasmiy sertifikat taqdim etiladi. Sertifikatning haqiqiyligini saytimizning **/verify/:certificateId** sahifasida istalgan ish beruvchi tekshirishi mumkin.`;
    } else {
      reply = `Assalomu alaykum! Men **MetaITSchool AI ta'lim assistentiman** 🤖.\n\nSizga qanday yordam bera olaman?\n- Dasturlash tushunchalari va kod sintaksisi bo'yicha tushuntirish berish\n- Kurslar va o'quv dasturlari haqida ma'lumot berish\n- Uy vazifalari va imtihonlarga tayyorgarlik bo'yicha maslahat berish\n- IT sohasida qaysi yo'nalishni tanlashni tavsiya qilish\n\nSavolingizni bemalol yozishingiz mumkin!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI chat endpoint error:', error);
    return NextResponse.json({ error: 'Serverda xatolik yuz berdi' }, { status: 500 });
  }
}
