import classNames from "classnames";

const Cell = ({
  children,
  bg,
}: {
  children: JSX.Element | string;
  bg?: string;
}) => {
  return (
    <span
      className={classNames(
        bg || "bg-gray-300",
        "inline-flex items-center min-h-[1.5rem] min-w-[1.5rem] m-1 px-2 max-w-full"
      )}
    >
      {children}
    </span>
  );
};

export default Cell;
