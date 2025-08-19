import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const {input, prev_response_id, model} = await req.json();
        const response = await openai.responses.create(
            {
                model: model || "gpt-5",
                instructions: 'You are a helpful assistant.',
                input: input,
                previous_response_id: prev_response_id,
            }
        );
        console.log('response text: ' + response.output_text);
        console.log('response id: ' + response.previous_response_id);

        return NextResponse.json({
            output_text: response.output_text,
            session_id: response.previous_response_id,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}
