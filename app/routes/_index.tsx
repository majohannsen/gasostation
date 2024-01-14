import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DepartureCard, { Line } from "~/components/DepartureCard";

type Monitor = {
  locationStop: {
    properties: {
      name: string; // DIVA Nummer der Haltestelle (=Haltestellennummer der el. Fahrplanauskunft)
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
    "http://www.wienerlinien.at/ogd_realtime/monitor?stopId=4934&stopId=4941"
  );
  const data = await res.json();
  const monitors: Monitor[] = data.data.monitors;
  const cleanedMonitors: Monitor[] = [];
  if (monitors.length) {
    monitors.forEach((monitor) => {
      const existingMonitor = cleanedMonitors.find(
        (m) =>
          (m.locationStop.properties.name =
            monitor.locationStop.properties.name)
      );
      if (existingMonitor) {
        existingMonitor.lines.push(...monitor.lines);
      } else {
        cleanedMonitors.push(monitor);
      }
    });
    return json(cleanedMonitors);
  } else return json([]);
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
            key={JSON.stringify(monitor)}
            station={monitor.locationStop.properties.title}
            directions={monitor.lines.map((line) => ({
              destination: line.towards,
              line: line.name as Line,
              times: line.departures.departure
                .slice(0, 2)
                .map((t) => t.departureTime.countdown),
            }))}
          />
        ))}
    </div>
  );
}
