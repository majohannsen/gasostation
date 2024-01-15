import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import DepartureCard, { Line } from "~/components/DepartureCard";
import PageWrapper from "~/components/PageWrapper";
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
    <PageWrapper sort={sort} setSort={setSort}>
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
              type: line.type,
              times: line.departures.departure.map((t) => t.departureTime),
            }))}
            limit={2}
            sort={sort}
          />
        ))}
    </PageWrapper>
  );
}
