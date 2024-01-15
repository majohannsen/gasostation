import { FC } from "react";
import { Monitor } from "~/functions/getMonitors";
import MonitorLine from "./MonitorLine";

export type Line = "U1" | "U2" | "U3" | "U4" | "U5" | "U6";

type Props = {
  monitor: Monitor;
  limit?: number;
  sort?: boolean;
};

const DepartureCard: FC<Props> = ({ monitor, limit, sort }) => {
  // const stationID = monitor.locationStop.properties.name;
  const station = monitor.locationStop.properties.title;

  const directions = monitor.lines.map((line) => ({
    destination: line.towards,
    line: line.name as Line,
    type: line.type,
    times: line.departures.departure.map((t) => t.departureTime),
  }));

  const sortedTimes = directions
    .map((direction) =>
      direction.times.slice(0, limit).map((time) => ({ ...direction, time }))
    )
    .flat()
    .sort(
      (a, b) =>
        new Date(a.time.timeReal || a.time.timePlanned).getTime() -
        new Date(b.time.timeReal || b.time.timePlanned).getTime()
    );

  return (
    <div>
      <h1 className="text-xl font-bold">{station}</h1>
      {sort ? (
        <ul className="flex flex-col gap-2">
          {directions.map(({ times, ...direction }, i) => (
            <li key={i}>
              <ul>
                {times.slice(0, limit).map((time) => (
                  <MonitorLine
                    key={direction.destination + time}
                    {...direction}
                    time={time}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        sortedTimes.map(({ line, type, destination, time }) => {
          return (
            <MonitorLine
              key={destination + time}
              {...{ line, type, destination, time }}
            />
          );
        })
      )}
    </div>
  );
};

export default DepartureCard;
