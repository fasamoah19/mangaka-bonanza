import { Manga } from "@/lib/types";
import Link from "next/link";

/**
 * A custom component that displays a cart icon
 * 
 * @returns CartIcon component
 */
export default function CartIcon() {
  return (
    <Link href={"#"}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 17C15.6628 17 16.2 16.4627 16.2 15.8C16.2 15.1373 15.6628 14.6 15 14.6C14.3373 14.6 13.8 15.1373 13.8 15.8C13.8 16.4627 14.3373 17 15 17Z"
          fill="black"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.99993 17C7.66265 17 8.19993 16.4627 8.19993 15.8C8.19993 15.1373 7.66265 14.6 6.99993 14.6C6.33718 14.6 5.79993 15.1373 5.79993 15.8C5.79993 16.4627 6.33718 17 6.99993 17Z"
          fill="black"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.4 2.6H17L15.4 11.4H5L3.4 2.6ZM3.4 2.6C3.26666 2.06666 2.6 1 1 1"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.4 11.4H5.00002H3.58464C2.15719 11.4 1.40002 12.025 1.40002 13C1.40002 13.9751 2.15719 14.6 3.58464 14.6H15"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
