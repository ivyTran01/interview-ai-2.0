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
                model: "gpt-5",
                instructions: 'You are a helpful assistant.',
                input: [
                    {
                        role: 'user',
                        content: input,
                    }
                ],
                store: true,
                previous_response_id: prev_response_id,
            }
        );
        console.log(response);
        console.log('response text: ' + response.output_text);
        console.log('response id: ' + response.id);
        console.log('response id prev: ' + response.previous_response_id);

        return NextResponse.json({
            res_content: response.output_text,
            res_id: response.id,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}
