import Link from "next/link";

/**
 * Footer for the Mangaka Bonanza website
 * 
 * @returns Footer component 
 */
export default function Footer() {
  return (
    <footer className="flex flex-row bg-black py-16 px-20">
      <div className="flex flex-row gap-x-12">
        <div className="flex flex-col space-y-4 text-white ">
          <Link href={"/"}>
            <div className="text-xs">Home</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">About</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">Contact</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">Help</div>
          </Link>
        </div>
        <div className="flex flex-col space-y-4 text-white">
          <Link href={"#"}>
            <div className="text-xs">Terms of Service</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">Privacy Policy</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">FAQ</div>
          </Link>
        </div>
      </div>

      <div className="grow"></div>
      <div className="flex flex-row place-items-center">
        <div className="text-sm mr-2 text-white">©</div>
        <Link href="/">
          <h3 className="text-xl font-anton font-bold text-white">
            Mangaka Bonanza
          </h3>
        </Link>
      </div>
    </footer>
  );
}
