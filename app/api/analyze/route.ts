import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Clean output from code fences / markdown
function cleanJSON(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function POST(req: Request) {
  const { reviews } = await req.json();

  if (!reviews || !Array.isArray(reviews)) {
    return NextResponse.json(
      { error: "Missing or invalid 'reviews' array." },
      { status: 400 }
    );
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const formattedReviews = reviews
    .map((r: any, i: number) => `${i + 1}. ${r.author}: ${r.content}`)
    .join("\n\n");

  const prompt = `
You will receive a list of movie reviews. Analyze them collectively.

Return STRICT JSON ONLY. NO MARKDOWN. NO CODE BLOCKS. NO EXTRA TEXT.

Return EXACTLY this shape:

{
  "overall_sentiment": "positive|negative|mixed",
  "explanation": "short explanation",
  "keywords": ["keyword1", "keyword2", "..."],
  "summary": "3–5 sentence spoiler-free summary"
}

Reviews:
${formattedReviews}
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // Remove markdown wrappers
  text = cleanJSON(text);

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse model JSON:", text);
    return NextResponse.json(
      { error: "Model returned invalid JSON", raw: text },
      { status: 500 }
    );
  }

  return NextResponse.json(parsed);
}

