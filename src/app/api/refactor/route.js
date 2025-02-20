import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { code } = await req.json();

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Kamu adalah AI expert refactoring kode. 
                                Optimalkan kode tanpa mengubah fungsionalitasnya. 
                                Gunakan teknik modern, bersih, dan efisien.`,
                            },
                            {
                                text: `Refactor kode berikut:
                                \`\`\`
                                ${code}
                                \`\`\`
                                Berikan hasil refactoring terbaik tanpa memberikan penjelasan, murni raw code tanpa \`\`\`:`,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const refactoredText = response.data.candidates[0].content.parts[0].text;
        const cleanedCode = refactoredText.replace(/```(?:javascript|js)?/g, "").trim();

        return NextResponse.json({ refactoredCode: cleanedCode });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "Gagal melakukan refactoring kode." },
            { status: 500 }
        );
    }
}
