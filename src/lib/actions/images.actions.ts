"use server";

import OpenAI from "openai";
import { IMAGE_RATIOS } from "../constants";
import { connectToDatabase } from "../mongoose";
import { decreaseCredits } from "../actions";
import { handleError } from "../utils";
import { Image } from "../models";
import { v2 as cloudinary } from "cloudinary";
import { string } from "zod";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/dashboard");

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
  imageId,
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

  const imageUrl = imageResponse.data[0]?.url;

  if (!imageUrl) {
    throw new Error("No image URL found in the response.");
  }

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_KEY!,
    api_secret: process.env.CLOUD_SECRET!,
  });

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: [userId],
          public_id: imageId,
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });

  return {
    success: true,
    data: imageId,
  };
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
