import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import SearchIcon from "~/components/icons/search";
import stations, { Station } from "~/data/stations";
import HomeIcon from "./icons/home";

export default function Navbar() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Station[]>([]);

  useEffect(() => {
    setSuggestions(
      stations
        .filter((station) =>
          station.PlatformText.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5)
    );
  }, [search]);

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
      <div className="relative">
        <input
          className="p-0.5 px-1.5 relative"
          type="text"
          value={search}
          placeholder="Suchen ..."
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {!!search.length && !!suggestions.length && (
          <div className="absolute bg-slate-200 w-full mt-1">
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion.DIVA}
                to={"/station/" + suggestion.DIVA}
                onClick={() => setSearch("")}
              >
                <div>{suggestion.PlatformText}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
