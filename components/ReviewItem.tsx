import { motion } from "framer-motion";
import StarIcon from "./icons/StarIcon";
import ThumbsUp from "./icons/ThumbsUp";
import ThumbsDown from "./icons/ThumbsDown";

/** Props necessary for the component */
type ReviewItemProps = {
  reviewer: string;
  rating: number;
  title: string;
  content: string;
};

/**
 * Custom component that displays reviews a manga received
 * 
 * @param param0 Review Item Props
 * @returns ReviewItem Component
 */
export default function ReviewItem({
  reviewer,
  title,
  rating,
  content,
}: ReviewItemProps) {
  return (
    <div className="flex flex-col w-52 h-96 bg-mangaCard shadow-md">
      <div className="flex flex-col pb-4 px-4 gap-y-4">
        {/** Reviewer user name */}
        <div className="pt-4 text-sm font-medium">{reviewer}</div>
        {/** Number of stars */}
        <div className="flex flex-row space-x-2 place-items-center">
          {Array.from(Array(rating).keys()).map((_, index) => (
            <div key={index}>
              <StarIcon />
            </div>
          ))}
        </div>
        {/** Title of the review */}
        <div className="text-sm font-semibold">{title}</div>
      </div>
      {/** Review content */}
      <div className="py-6 bg-white text-xs px-2 text-ellipsis overflow-hidden">{content}</div>
      
      {/** Thumbs up and down buttons */}
      <div className="flex flex-row">
        <motion.button
          className="flex w-1/2 h-7 bg-siteBlue place-content-center place-items-center"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ThumbsUp />
        </motion.button>
        <motion.button
          className="flex w-1/2 h-7 bg-siteLightGray place-content-center place-items-center"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ThumbsDown />
        </motion.button>
      </div>
    </div>
  );
}
