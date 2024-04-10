import OpenAI from "openai";
import { createTask } from "next-server-task/server";
import { TaskError } from "next-server-task/common";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

const generateImage = createTask("/api/generate-image").withAction(
  async ({
    imageDetails = {
      ratio: "square",
      size: "1024x1024",
      cost: 5,
    },
    prompt,
    quantity = 1,
    standard = "standard",
  }: {
    imageDetails?: {
      ratio: string;
      size:
        | "256x256"
        | "512x512"
        | "1024x1024"
        | "1792x1024"
        | "1024x1792"
        | null
        | undefined;
      cost: number;
    };
    prompt: string;
    quantity?: number;
    standard: string;
    userId: string;
    imageId: string;
  }) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const results = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: quantity,
      quality: standard === "standard" ? "standard" : "hd",
      size: imageDetails.size,
    });

    const url = results.data[0].url;

    if (url == null) {
      throw new TaskError("Failed to generate image");
    }

    revalidatePath("/dashboard");

    return { url };
  },
);

export type GenerateImage = typeof generateImage;

const { handler } = generateImage.serverHandler();
export { handler as GET };
