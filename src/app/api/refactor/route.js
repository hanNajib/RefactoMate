import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { code } = await req.json();

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `Kamu adalah AI expert refactoring kode. 
                                Optimalkan kode tanpa mengubah fungsionalitasnya. 
                                Gunakan teknik modern, bersih, dan efisien, Best Practices (DRY, SOLID, KISS)`,
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
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 64,
                    "topP": 0.95,
                    "maxOutputTokens": 65536,
                    "responseMimeType": "text/plain"
                  }
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
