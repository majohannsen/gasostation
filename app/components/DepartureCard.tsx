import { FC } from "react";

export type Line = "U1" | "U2" | "U3" | "U4" | "U5" | "U6";

type Props = {
  station: string;
  directions: { line: Line; destination: string; times: number[] }[];
  limit?: number;
};

const DepartureCard: FC<Props> = ({ station, directions, limit }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{station}</h1>
      <ul>
        {directions.map(({ line, destination, times }) =>
          times.slice(0, limit).map((time) => (
            <li className="flex flex-row gap-2" key={destination + time}>
              <div>{line}</div>
              <div>{destination}</div>
              <div>{time} min</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DepartureCard;
