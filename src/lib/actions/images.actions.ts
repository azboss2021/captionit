"use server";

import OpenAI from "openai";
import { IMAGE_RATIOS } from "../constants";
import { connectToDatabase } from "../mongoose";
import { decreaseCredits } from "../actions";
import { handleError } from "../utils";
import { Image } from "../models";

export async function createImage(
  userId: string,
  imageLink: string,
  size: string,
) {
  try {
    await connectToDatabase();

    const newImage = await Image.create({
      url: imageLink,
      author: userId,
      size: size,
    });

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

export async function generateImage({
  imageDetails = {
    ratio: "square",
    size: "1024x1024",
    cost: 5,
  },
  prompt,
  quantity = 1,
  standard = "standard",
  userId,
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
}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

  // const imageResponse = await openai.images.generate({
  //   model: "dall-e-3",
  //   prompt: prompt,
  //   n: quantity,
  //   quality: standard ? "standard" : "hd",
  //   size: imageDetails.size,
  // });

  // if (imageResponse.data) {
  await decreaseCredits(userId, imageDetails.cost * quantity);
  await createImage(
    userId,
    // imageResponse.data[0].url as string,
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-VZc1uvUIbyLfCRnGBHjVjl0Z/user-s0DcKJfoBXkSJOcBfhla7moU/img-FR03yOftSQ3iNFJ2VUM0Yvsi.png?st=2024-03-21T00%3A29%3A38Z&se=2024-03-21T02%3A29%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-20T23%3A21%3A19Z&ske=2024-03-21T23%3A21%3A19Z&sks=b&skv=2021-08-06&sig=AOdZ6SWOaKXwZDM207yg7SSWKUz9xE5N7iRliESnp0Q%3D",
    imageDetails.size as string,
  );
  // }

  // console.log(response.data);
  return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-VZc1uvUIbyLfCRnGBHjVjl0Z/user-s0DcKJfoBXkSJOcBfhla7moU/img-FR03yOftSQ3iNFJ2VUM0Yvsi.png?st=2024-03-21T00%3A29%3A38Z&se=2024-03-21T02%3A29%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-20T23%3A21%3A19Z&ske=2024-03-21T23%3A21%3A19Z&sks=b&skv=2021-08-06&sig=AOdZ6SWOaKXwZDM207yg7SSWKUz9xE5N7iRliESnp0Q%3D";
}
