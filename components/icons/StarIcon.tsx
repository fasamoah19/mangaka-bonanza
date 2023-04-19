/**
 * A component used to display the rating of a manga
 * 
 * @param param0 Manga object
 * @returns StarIcon component
 */
export default function StarIcon() {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M6.21059 5.75482L8.36381 1.41759C8.64018 0.860803 9.43879 0.860803 9.71516 1.41759L11.8683 5.75482L16.6836 6.45462C17.3014 6.5444 17.5476 7.29951 17.1004 7.73263L13.6167 11.1064L14.4388 15.8725C14.5444 16.4846 13.8983 16.9513 13.3455 16.6622L9.03948 14.4107L4.73349 16.6622C4.18069 16.9513 3.53451 16.4846 3.64009 15.8725L4.46224 11.1064L0.978584 7.73263C0.5313 7.29951 0.777539 6.5444 1.39535 6.45462L6.21059 5.75482Z"
        fill="#EBE11D"
        stroke="black"
        strokeWidth="0.22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
