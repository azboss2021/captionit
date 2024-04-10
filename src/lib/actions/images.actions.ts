"use server";

import OpenAI from "openai";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import { Image } from "../models";

export async function createImage({
  userId,
  prompt,
  size,
  style,
  standard,
  imageId,
}: {
  userId: string;
  prompt: string;
  size: string;
  style: string;
  standard: boolean;
  imageId: string;
}) {
  try {
    await connectToDatabase();

    const newImage = await Image.create({
      author: userId,
      prompt,
      size,
      standard,
      style,
      cloudinaryId: imageId,
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
}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

  const imageResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: quantity,
    quality: standard === "standard" ? "standard" : "hd",
    size: imageDetails.size,
  });

  return imageResponse.data[0]?.url;
}

export async function getIsUpvoted({
  cloudinaryId,
  userId,
}: {
  cloudinaryId: string;
  userId: string;
}) {
  const image = await Image.findOne({ cloudinaryId, upvotes: userId });
  return !!image;
}

export async function upvoteImage(
  cloudinaryId: string,
  userId: string,
): Promise<void> {
  try {
    const image = await Image.findOne({ cloudinaryId, upvotes: userId });
    if (image) return;
    await Image.updateOne({ cloudinaryId }, { $addToSet: { upvotes: userId } });
  } catch (error) {
    handleError(error);
  }
}

export async function removeUpvoteImage(
  cloudinaryId: string,
  userId: string,
): Promise<void> {
  try {
    const image = await Image.findOne({ cloudinaryId, upvotes: userId });
    if (!image) return;
    await Image.updateOne({ cloudinaryId }, { $pull: { upvotes: userId } });
  } catch (error) {
    handleError(error);
  }
}

export async function getVoteCount({ cloudinaryId }: { cloudinaryId: string }) {
  const result = await Image.aggregate([
    { $match: { cloudinaryId } },
    { $project: { upvoteCount: { $size: "$upvotes" } } },
  ]);

  // Extract the upvote count from the result
  const upvoteCount = result.length > 0 ? result[0].upvoteCount : 0;

  return upvoteCount;
}
