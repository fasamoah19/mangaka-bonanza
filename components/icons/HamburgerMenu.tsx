import { Dispatch, SetStateAction } from "react";

type HamburgerMenuProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  closeMenus: () => void;
};

export default function HamburgerMenu({
  showMenu,
  setShowMenu,
  closeMenus,
}: HamburgerMenuProps) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 14 10"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        if (showMenu) {
          closeMenus()
        }
        else {
          setShowMenu(true)
        }
      }}
    >
      <line y1="0.5" x2="14" y2="0.5" stroke="black" />
      <line y1="4.18457" x2="14" y2="4.18457" stroke="black" />
      <line y1="8.60449" x2="14" y2="8.60449" stroke="black" />
    </svg>
  );
}
