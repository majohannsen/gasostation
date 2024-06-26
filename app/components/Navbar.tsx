import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { PiHouseBold } from "react-icons/pi";
import stations, { Station } from "~/data/stations";

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
    <div className="p-2 flex flex-row gap-2 items-center justify-between">
      <div className="w-6 h-6">
        {location.pathname !== "/" && (
          <Link to="/">
            <PiHouseBold className="h-full w-full" />
          </Link>
        )}
      </div>

      <div className="relative">
        <input
          className="p-2 px-3 rounded-md relative bg-slate-200"
          type="text"
          value={search}
          placeholder="Station suchen"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {!!search.length && !!suggestions.length && (
          <div className="absolute w-full mt-1">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.DIVA}
                className="border-slate-400 border-t first:border-t-0 bg-slate-200 first:rounded-t-md last:rounded-b-md"
              >
                <Link
                  to={"/station/" + suggestion.DIVA}
                  onClick={() => setSearch("")}
                >
                  <div className="px-3 py-2">{suggestion.PlatformText}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-6 h-6"></div>
    </div>
  );
}
