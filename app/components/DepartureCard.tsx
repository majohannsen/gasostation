import { FC } from "react";
import { DepartureTime } from "~/functions/getMonitors";

export type Line = "U1" | "U2" | "U3" | "U4" | "U5" | "U6";

type Props = {
  station: string;
  directions: { line: Line; destination: string; times: DepartureTime[] }[];
  limit?: number;
  sort?: boolean;
};

const DepartureCard: FC<Props> = ({ station, directions, limit, sort }) => {
  const sortedTimes = directions
    .map(({ line, destination, times }) =>
      times.slice(0, limit).map((time) => ({ line, destination, time }))
    )
    .flat()
    .sort(
      (a, b) =>
        new Date(a.time.timeReal || a.time.timePlanned).getTime() -
        new Date(b.time.timeReal || b.time.timePlanned).getTime()
    );

  return (
    <div>
      <h1 className="text-3xl font-bold">{station}</h1>
      {sort ? (
        <ul className="flex flex-col gap-2">
          {directions.map(({ line, destination, times }, i) => (
            <li key={i}>
              <ul>
                {times.slice(0, limit).map((time) => (
                  <li className="flex flex-row gap-2" key={destination + time}>
                    <div>{line}</div>
                    <div>{destination}</div>
                    <div>{time.countdown} min</div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        sortedTimes.map(({ line, destination, time }) => {
          return (
            <li className="flex flex-row gap-2" key={destination + time}>
              <div>{line}</div>
              <div>{destination}</div>
              <div>{time.countdown} min</div>
            </li>
          );
        })
      )}
    </div>
  );
};

export default DepartureCard;
