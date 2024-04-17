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

      if (fetcher.state == "idle") fetcher.load(fetchString);
    }
  }, [data, fetcher, likedStations]);

  useEffect(() => {
    setData(fetcher.data as Monitor[]);
  }, [fetcher.state, fetcher]);

  return (
    <PageWrapper sort={sort} setSort={setSort}>
      <div className="flex flex-col gap-3">
        {!!data?.length &&
          data.map((monitor) => (
            <DepartureCard
              key={monitor.locationStop.properties.name}
              monitor={monitor}
              limit={2}
              sort={sort}
            />
          ))}
      </div>
    </PageWrapper>
  );
}
