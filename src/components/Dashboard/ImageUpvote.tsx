"use client";

import { FaChevronUp } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useState } from "react";
import { FaChevronCircleUp } from "react-icons/fa";
import { removeUpvoteImage, upvoteImage } from "@/lib/actions/images.actions";
import { dateIsLessThan } from "@/lib/utils";

const ImageUpvote = ({
  isUpvoted,
  upvoteCount,
  userId,
  cloudinaryId,
}: {
  isUpvoted: boolean;
  upvoteCount: number;
  userId: string;
  cloudinaryId: string;
}) => {
  const [lastUpdated, setLastUpdated] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  );
  const [upvoted, setUpvoted] = useState(isUpvoted);
  const [upvotes, setUpvotes] = useState(upvoteCount);

  const handleUpvote = async () => {
    setUpvoted((curr) => !curr);
    if (upvoted) {
      setUpvotes((curr) => curr - 1);

      if (dateIsLessThan(lastUpdated, 10000)) return;
      await removeUpvoteImage(cloudinaryId, userId);
      setLastUpdated(new Date());
    } else {
      setUpvotes((curr) => curr + 1);

      if (dateIsLessThan(lastUpdated, 10000)) return;
      await upvoteImage(cloudinaryId, userId);
      setLastUpdated(new Date());
    }
  };

  return (
    <Button
      className={`min-w-20 font-semibold`}
      onClick={handleUpvote}
      variant={upvoted ? "default" : "outline"}
    >
      {upvoted ? (
        <FaChevronCircleUp className="mr-2" size={17} />
      ) : (
        <FaChevronUp className="mr-2" />
      )}{" "}
      {upvotes}
    </Button>
  );
};
export default ImageUpvote;
