import { json } from "@remix-run/react";

export type Monitor = {
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
          timePlanned: string; // Abfahrtzeit laut Fahrplan
          timeReal?: string; // Prognostizierte Abfahrtzeit (Echtzeit)
          countdown: number; // Verbleibende Minuten bis zur Abfahrt
        };
      }[];
    };
  }[];
};

export type DepartureTime =
  Monitor["lines"][number]["departures"]["departure"][number]["departureTime"];

export default async function fetchMonitors(stopIds: (number | string)[]) {
  const res = await fetch(
    "http://www.wienerlinien.at/ogd_realtime/monitor?" +
      stopIds.map((id) => "stopId=" + id).join("&")
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
}
