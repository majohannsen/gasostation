import { type MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import DepartureCard, { LIKED_STATIONS_KEY } from "~/components/DepartureCard";
import PageWrapper from "~/components/PageWrapper";
import { Monitor } from "~/functions/getMonitors";

export const meta: MetaFunction = () => {
  return [
    { title: "Gasostation" },
    { name: "description", content: "Wiener Ubahn Infos" },
  ];
};

export default function Index() {
  const [sort, setSort] = useState(false);

  const [data, setData] = useState<Monitor[]>();

  const [likedStations, setLikedStations] = useState<string[]>();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!likedStations) {
      try {
        const ls = window.localStorage.getItem(LIKED_STATIONS_KEY);
        if (ls) {
          const parsedStations: string[] = JSON.parse(ls);
          setLikedStations(parsedStations);
        }
      } catch (error) {
        setLikedStations([]);
      }
    } else if (!data) {
      const formData = new FormData();
      formData.set("likedStations", JSON.stringify(likedStations));
      const fetchString =
        "/stations?" +
        likedStations?.map((s) => "likedStations=" + s).join("&");
      console.log("submit");

      if (fetcher.state == "idle")
        setTimeout(() => fetcher.load(fetchString), 2000);
    }
    console.log("likedStations:", likedStations);
  }, [data, fetcher, likedStations]);

  useEffect(() => {
    console.log("fetcher.state:", fetcher.state);
    console.log("fetcher.data:", fetcher.data);
    setData(fetcher.data as Monitor[]);
  }, [fetcher.state, fetcher]);

  return (
    <PageWrapper sort={sort} setSort={setSort}>
      {!!data?.length &&
        data.map((monitor) => (
          <DepartureCard
            key={monitor.locationStop.properties.name}
            monitor={monitor}
            limit={2}
            sort={sort}
          />
        ))}
    </PageWrapper>
  );
}
