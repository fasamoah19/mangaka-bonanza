// Props necessary for component
type TooltipProps = {
  children: React.ReactNode;
  label: string;
  decreaseY?: boolean; // Flag to decrease the space between the tooltip and the item above it
  display?: string;
  width?: string;
  height?: string;
};

/**
 * A custom component that displays a tooltip beneath a React component
 *
 * @param props TooltipProps
 * @returns Tooltip component
 */
export default function Tooltip(props: TooltipProps) {
  const { label, children, decreaseY, display, width, height } = props;
  const translateY = decreaseY ? "translate-y-1" : "translate-y-4";
  return (
    <div className={`group relative ${display} ${width} ${height}`}>
      <span
        className={`group-hover:opacity-100 transition-opacity bg-gray-500 px-1 text-xs text-gray-100 rounded-md absolute left-1/4 -translate-x-1/3 ${translateY} opacity-0 m-4 mx-auto w-max z-10`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
