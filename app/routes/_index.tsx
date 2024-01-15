import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import DepartureCard, { Line } from "~/components/DepartureCard";
import Navbar from "~/components/Navbar";
import GroupIcon from "~/components/icons/group";
import TimeIcon from "~/components/icons/time";
import fetchMonitors from "~/functions/getMonitors";
import getStopIDs from "~/functions/getStopIds";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return fetchMonitors(getStopIDs(60201749));
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [sort, setSort] = useState(false);

  return (
    <div className="sm:py-5 mx-auto sm:max-w-96">
      <Navbar />
      <div className="flex justify-end">
        <button onClick={() => setSort(!sort)} className="w-8 h-8">
          {sort ? <TimeIcon /> : <GroupIcon />}
        </button>
      </div>
      <div className="px-2">
        <h1 className="text-3xl font-bold text-violet-600">
          Welcome to Gasostation
        </h1>
        {!!loaderData.length &&
          loaderData.map((monitor) => (
            <DepartureCard
              key={JSON.stringify(monitor)}
              station={monitor.locationStop.properties.title}
              directions={monitor.lines.map((line) => ({
                destination: line.towards,
                line: line.name as Line,
                times: line.departures.departure.map((t) => t.departureTime),
              }))}
              limit={2}
              sort={sort}
            />
          ))}
      </div>
    </div>
  );
}
