import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { PiStarBold, PiStarFill, PiTriangleBold } from "react-icons/pi";
import { Monitor } from "~/functions/getMonitors";
import MonitorLine from "./MonitorLine";

export const LIKED_STATIONS_KEY = "likedStations";
export type Line = "U1" | "U2" | "U3" | "U4" | "U5" | "U6";

type Props = {
  monitor: Monitor;
  limit?: number;
  sort?: boolean;
  allwaysOpen?: boolean;
};

const DepartureCard: FC<Props> = ({ monitor, limit, sort, allwaysOpen }) => {
  const [open, setOpen] = useState(allwaysOpen);
  const stationID = monitor.locationStop.properties.name;
  const stationName = monitor.locationStop.properties.title;

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

  const [hasLiked, setHasLiked] = useState<boolean>();

  useEffect(() => {
    try {
      const likedStations = window.localStorage.getItem(LIKED_STATIONS_KEY);
      if (likedStations) {
        const parsedStations: unknown[] = JSON.parse(likedStations);
        setHasLiked(!!parsedStations.find((v) => v === stationID));
      }
    } catch (error) {
      setHasLiked(false);
    }
  }, [stationID]);

  useEffect(() => {
    if (hasLiked !== undefined) {
      let parsedStations: string[] = [];
      try {
        const likedStations = window.localStorage.getItem(LIKED_STATIONS_KEY);
        if (likedStations) {
          parsedStations = JSON.parse(likedStations);
        }
        if (hasLiked) {
          if (!parsedStations.find((v) => v == stationID))
            parsedStations.push(stationID);
        } else {
          parsedStations = parsedStations.filter((v) => v !== stationID);
        }
      } catch (error) {
        parsedStations = [stationID];
      }
      window.localStorage.setItem(
        LIKED_STATIONS_KEY,
        JSON.stringify(parsedStations)
      );
    }
  }, [hasLiked, stationID]);

  return (
    <div>
      <div className="flex items-center gap-2 flex-row">
        <button
          className="flex flex-row justify-between grow items-center gap-2"
          onClick={() => setOpen(!open)}
        >
          <h1 className="text-xl font-bold">{stationName}</h1>
          {!allwaysOpen && (
            <PiTriangleBold
              className={classNames("h-4 w-4 transition", {
                "rotate-0": open,
                "rotate-180": !open,
              })}
            />
          )}
        </button>
        <button onClick={() => setHasLiked(!hasLiked)}>
          {hasLiked ? (
            <PiStarFill
              className={classNames("w-6 h-6", { "fill-black": hasLiked })}
            />
          ) : (
            <PiStarBold
              className={classNames("w-6 h-6", { "fill-black": hasLiked })}
            />
          )}
        </button>
      </div>
      {open && (
        <>
          {sort ? (
            <ul className="flex flex-col gap-2">
              {directions.map(({ times, ...direction }, i) => (
                <li key={i}>
                  <ul>
                    {times.slice(0, limit).map((time) => (
                      <MonitorLine
                        key={direction.destination + time.countdown}
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
                  key={destination + time.countdown}
                  {...{ line, type, destination, time }}
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default DepartureCard;
