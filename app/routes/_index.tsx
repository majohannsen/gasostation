import type { MetaFunction } from "@remix-run/node";
import DepartureCard from "~/components/DepartureCard";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold underline text-violet-600">
        Welcome to Gasostation
      </h1>
      <DepartureCard
        station="Gasometer"
        directions={[
          { line: "U3", destination: "Simmering", time: 2 },
          { line: "U3", destination: "Ottakring", time: 3 },
        ]}
      />
    </div>
  );
}
