import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("params.id:", params.id);
  const stops = getStopIDs(Number(params.id));
  if (stops.length) {
    return fetchMonitors(stops);
  } else throw new Response("", { status: 404 });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [sort, setSort] = useState(false);

  return (
    <PageWrapper sort={sort} setSort={setSort}>
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
            sort={sort}
          />
        ))}
    </PageWrapper>
  );
}
