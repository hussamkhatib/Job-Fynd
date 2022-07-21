const Cell = ({ children }: { children: JSX.Element | string }) => {
  return (
    <span className="inline-flex items-center min-h-[1.5rem] min-w-[1.5rem] px-2 max-w-full rounded bg-gray-300">
      {children}
    </span>
  );
};

export default Cell;
