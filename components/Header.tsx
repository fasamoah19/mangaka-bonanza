import UserIcon from "./icons/UserIcon";
import { useCartContext } from "@/context/CartContextProvider";
import Link from "next/link";
import { genres } from "@/lib/constants";
import HamburgerMenu from "./icons/HamburgerMenu";
import { useState } from "react";

/**
 * Sticky Header component
 *
 * @returns Header componenet
 */
export default function Header() {
  const cart = useCartContext();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <header className="sticky z-50 top-0 bg-white py-4 shadow-sm">
      <div className="flex flex-row px-4 md:px-8 place-items-center">
        <div className="flex">
          <Link href="/">
            <h3 className="text-xl md:text-3xl font-anton font-bold">
              Mangaka Bonanza
            </h3>
          </Link>
        </div>
        <div className="grow"></div> {/** Spacer */}
        <nav className="hidden md:flex space-x-4 place-items-center">
          <ul className="flex flex-col md:flex-row space-x-6">
            <li>
              <Link className="text-sm font-semibold text-gray-600" href="/">
                Home
              </Link>
            </li>
            <li className="group">
              <Link className="text-sm font-semibold text-gray-600" href="#">
                Genres
              </Link>
              {/** List of genres in the hidden menu. Menu displays on hover */}
              <div className="hidden w-36 absolute px-4 py-4 bg-white shadow-md rounded-xl group-hover:flex group-hover:flex-col gap-y-3">
                {genres.map((genre) => (
                  <Link
                    href={`/genres/${genre}`}
                    key={genre}
                    className="text-sm font-medium hover:text-siteRed text-gray-500"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-sm font-semibold text-gray-600"
              >
                Cart
              </Link>
              {cart.length > 0 ? (
                <div className="rounded-full h-2 w-2 bg-siteRed absolute -translate-y-5 translate-x-6"></div>
              ) : (
                <></>
              )}
            </li>
          </ul>

          <UserIcon />
        </nav>
        <div className="flex md:hidden">
          <div className="group">
            <HamburgerMenu />
            <div className="hidden w-36 absolute right-4 px-4 py-4 bg-white shadow-md rounded-xl group-hover:flex">
              <nav className="flex flex-col space-x-4 place-items-center">
                <ul className="flex flex-col md:flex-row space-x-6">
                  <li>
                    <Link
                      className="text-sm font-semibold text-gray-600"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      className="text-sm font-semibold text-gray-600"
                      href="#"
                    >
                      Genres
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Cart
                    </Link>
                    {cart.length > 0 ? (
                      <div className="rounded-full h-2 w-2 bg-siteRed absolute -translate-y-5 translate-x-6"></div>
                    ) : (
                      <></>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
