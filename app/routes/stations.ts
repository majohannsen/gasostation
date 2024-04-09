import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import fetchMonitors from "~/functions/getMonitors";
import getStopIDs from "~/functions/getStopIds";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const url = new URL(args.request.url);
  const likedStations: string[] = url.searchParams.getAll("likedStations");

  console.log("likedStations:", likedStations);
  const divas = likedStations.map((s) => Number(s));
  const stopIDs = divas.flatMap((diva) => getStopIDs(diva));
  console.log("stopIDs:", stopIDs);
  return fetchMonitors(stopIDs);
};
