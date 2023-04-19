import { Link } from "@chakra-ui/react";
import { Anton } from "next/font/google";
import UserIcon from "./icons/UserIcon";

/** Font used for the logo */
const anton = Anton({ subsets: ["latin"], weight: "400" });

/**
 * Sticky Header component
 *
 * @returns Header componenet
 */
export default function Header() {
  return (
    <header className="flex sticky z-50 top-0 bg-white py-4">
      <Link href="/">
        <h3 className="text-3xl font-anton font-bold">Mangaka Bonanza</h3>
      </Link>
      <div className="grow"></div> {/** Spacer */}
      <nav className="flex space-x-4 align-middle">
        <ul className="flex flex-col md:flex-row space-x-4">
          <li>
            <a href="#" className="text-sm">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              Genres
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              Cart
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              About
            </a>
          </li>
        </ul>

        <UserIcon />
      </nav>
    </header>
  );
}
