import Link from "next/link";
import UserProfileIcon from "../features/profile/UserProfileIcon";

const Header = () => {
  return (
    <nav className="flex justify-between w-full p-3 border-b">
      <Link href="/" className="font-semibold text-xl">
        🗓 CorgiCal
      </Link>
      <UserProfileIcon />
    </nav>
  );
};

export default Header;
