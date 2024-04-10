import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: body.prompt,
      n: body.quantity,
      quality: body.standard === "standard" ? "standard" : "hd",
      size: body.imageDetails.size,
    });

    const imageUrl = imageResponse.data[0]?.url;

    revalidatePath("/dashboard");

    return Response.json({ imageUrl }, { status: 201 });
  } catch (error) {
    handleError(error);
  }
}
