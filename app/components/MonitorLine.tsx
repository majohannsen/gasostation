import classNames from "classnames";
import { FC } from "react";
import { DepartureTime } from "~/functions/getMonitors";

export type Line = "U1" | "U2" | "U3" | "U4" | "U5" | "U6";

const METRO_TYPE = "ptMetro";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LineColors = {
  // currently just here so that tailwind generates the classes
  U1: "bg-U1",
  U2: "bg-U2",
  U3: "bg-U3",
  U4: "bg-U4",
  U6: "bg-U6",
  ptBusCity: "bg-ptBusCity",
  ptTram: "bg-ptTram",
  ptTramWLB: "bg-ptTramWLB",
};

type Props = {
  line: Line;
  type: string;
  destination: string;
  time: DepartureTime;
};

const MonitorLine: FC<Props> = ({ line, type, destination, time }) => {
  return (
    <li className="flex flex-row gap-2 items-center" key={destination + time}>
      <div
        className={classNames(
          `bg-${type === METRO_TYPE ? line : type}`,
          "rounded-md py-0.5 px-2 my-1 text-white"
        )}
      >
        {line}
      </div>
      <div>{destination}</div>
      <div className="grow flex justify-end">{time.countdown} min</div>
    </li>
  );
};

export default MonitorLine;
