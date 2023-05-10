import UserIcon from "./icons/UserIcon";
import { useCartContext } from "@/context/CartContextProvider";
import Link from "next/link";
import { genres } from "@/lib/constants";
import HamburgerMenu from "./icons/HamburgerMenu";
import { useEffect, useState } from "react";
import useFetchScrollY from "@/hooks/useFetchScrollY";

/**
 * Sticky Header component
 *
 * @returns Header componenet
 */
export default function Header() {
  const cart = useCartContext();
  const scrollY = useFetchScrollY();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showMobileGenreMenu, setShowMobileGenreMenu] =
    useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(scrollY);

  /** Helper function that closes the menus */
  const closeMenus = () => {
    setShowMenu(false);
    setShowMobileGenreMenu(false);
  };

  useEffect(() => {
    // If the user has scrolled 100 pixels up or down from the position where the menu
    // was opened, we close the menu
    if (prevScrollY + 100 < scrollY || prevScrollY - 100 > scrollY) {
      closeMenus();
      setPrevScrollY(scrollY);
    }
  }, [scrollY]);

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
        <nav className="hidden md:flex space-x-4">
          <ul className="flex flex-row space-x-6 place-items-center">
            <li>
              <Link className="text-sm font-semibold text-gray-600" href="/">
                Home
              </Link>
            </li>
            <li className="group place-content-center">
              <div className="text-sm font-semibold text-gray-600 pt-0.5 cursor-pointer">
                Genres
              </div>
              {/** List of genres in the hidden menu. Menu displays on hover */}
              <GenresDropDownMenu />
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
        {/** Mobile Header */}
        <div className="flex md:hidden">
          <div className="group">
            <HamburgerMenu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              closeMenus={closeMenus}
            />
            {/** Dropdown Menu */}
            {showMenu ? (
              <div className="hidden w-28 absolute right-4 px-4 py-4 bg-white shadow-md rounded-xl group-hover:flex">
                <nav className="flex flex-col space-x-4 place-items-center">
                  <ul className="flex flex-col gap-y-2">
                    <li onClick={closeMenus}>
                      <Link
                        className="text-sm font-semibold text-gray-600"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="group"
                      onClick={() => {
                        setShowMobileGenreMenu(!showMobileGenreMenu);
                      }}
                    >
                      <div className="text-sm font-semibold text-gray-600">
                        Genres
                      </div>
                      {/** List of genres in the hidden menu. Menu displays on click/tap of Genres list item */}
                      {showMobileGenreMenu ? (
                        <GenresDropDownMenu />
                      ) : (
                        <></>
                      )}
                    </li>
                    <li onClick={closeMenus}>
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
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Component for Genre dropdown menu
 * 
 * @returns GenresDropDownMenu component
 */
const GenresDropDownMenu = () => {
  return (
    <div className="flex flex-col top-10 right-28 md:top-auto md:right-auto md:hidden md:group-hover:flex md:group-hover:flex-col w-36 absolute px-4 py-4 bg-white shadow-md rounded-xl gap-y-3">
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
  );
};
