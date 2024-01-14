import { Link, useLocation } from "@remix-run/react";
import SearchIcon from "~/components/icons/search";
import HomeIcon from "./icons/home";

export default function Navbar() {
  const location = useLocation();
  return (
    <div className="p-2 bg-slate-300 flex flex-row gap-2 items-center">
      {location.pathname !== "/" && (
        <Link to="/">
          <div className="w-8 h-8">
            <HomeIcon />
          </div>
        </Link>
      )}
      <div className="w-8 h-8">
        <SearchIcon />
      </div>
      {location.pathname}
    </div>
  );
}
