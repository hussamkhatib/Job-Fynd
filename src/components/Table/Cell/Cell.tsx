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
        bg || "",
        "inline-flex items-center min-h-[1.5rem] min-w-[1.5rem] m-1 px-2 max-w-full rounded bg-gray-300"
      )}
    >
      {children}
    </span>
  );
};

export default Cell;
