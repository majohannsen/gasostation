import { FC } from "react";

type Props = {
  station: string;
};

const DepartureCard: FC<Props> = ({ station }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{station}</h1>
      <ul>
        <li>Ottakring</li>
        <li>Simmering</li>
      </ul>
    </div>
  );
};

export default DepartureCard;
