import { Avatar, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import { Anton } from "next/font/google";

/** Font used for the logo */
const anton = Anton({ subsets: ["latin"], weight: "400" });

/**
 * Sticky Header component
 *
 * @returns Header componenet
 */
export default function Header() {
  return (
    <>
      {/* <HeaderChakraUI /> */}
      <HeaderTailwindCSS />
    </>
  );
}

const HeaderChakraUI = () => {
  return (
    <Flex as="header">
      <Heading as={"h3"} fontSize={"3xl"} fontFamily={anton.style.fontFamily}>
        Mangaka Bonanza
      </Heading>
      <Spacer />
      <Flex as="nav" gap={4} fontSize={14} align={"center"}>
        <Link>Home</Link>
        <Link>Genres</Link>
        <Link>Cart</Link>
        <Link>About</Link>
        <Avatar size={"sm"} name="Frederick Asamoah" bg="red.300" />
      </Flex>
    </Flex>
  );
};

const HeaderTailwindCSS = () => {
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

        <div className="relative w-8 h-8 overflow-hidden bg-red-300 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </nav>
    </header>
  );
};
