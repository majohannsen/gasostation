import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DepartureCard from "~/components/DepartureCard";

type Monitor = {
  locationStop: {
    properties: {
      title: string; // Name der Haltestelle
    };
  };
  lines: {
    name: string; // Name der Linie (e.g.: 13A)
    towards: string; // Name des Ziels (e.g.: Burggasse, Stadthalle U)
    departures: {
      departure: {
        departureTime: {
          countdown: number; // Verbleibende Minuten bis zur Abfahrt
        };
      }[];
    };
  }[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const res = await fetch(
    "http://www.wienerlinien.at/ogd_realtime/monitor?stopId=147"
  );
  const data = await res.json();
  const monitors: Monitor[] = data.data.monitors;
  console.log("data:", data);
  console.log("monitors:", monitors);
  if (monitors.length) return json(monitors);
  else return json([]);
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold underline text-violet-600">
        Welcome to Gasostation
      </h1>
      {!!loaderData.length &&
        loaderData.map((monitor) => (
          <DepartureCard
            key=""
            station={monitor.locationStop.properties.title}
            directions={[
              { line: "U3", destination: "Simmering", time: 2 },
              { line: "U3", destination: "Ottakring", time: 3 },
            ]}
          />
        ))}
    </div>
  );
}
