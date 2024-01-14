import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DepartureCard, { Line } from "~/components/DepartureCard";
import getMonitors from "~/functions/getMonitors";
import getStopIDs from "~/functions/getStopIds";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("params.id:", params.id);
  return getMonitors(getStopIDs(Number(params.id)));
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="m-10 mx-auto max-w-96">
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