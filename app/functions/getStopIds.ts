import stops from "~/data/stops";

export default function getStopIDs(diva: number) {
  return stops.filter((s) => s.DIVA === diva).map((s) => s.StopID);
}
