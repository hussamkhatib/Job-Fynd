import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-6 px-8 lg:px-12 w-full">
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="54" height="54" rx="8" fill="black" />
      </svg>
      <UserMenu />
    </header>
  );
};

export default Header;
