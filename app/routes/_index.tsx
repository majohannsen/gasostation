import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DepartureCard, { Line } from "~/components/DepartureCard";
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
  return (
    <div className="m-10 mx-auto max-w-96">
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
              times: line.departures.departure.map(
                (t) => t.departureTime.countdown
              ),
            }))}
          />
        ))}
    </div>
  );
}
