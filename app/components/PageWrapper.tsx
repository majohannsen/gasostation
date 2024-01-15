import { FC, ReactNode } from "react";
import Navbar from "~/components/Navbar";
import GroupIcon from "~/components/icons/group";
import TimeIcon from "~/components/icons/time";

type Props = {
  sort: boolean;
  setSort: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
};
const PageWrapper: FC<Props> = ({ sort, setSort, children }) => {
  return (
    <div className="sm:py-5 mx-auto sm:max-w-96">
      <Navbar />
      <div className="flex justify-end">
        <button onClick={() => setSort(!sort)} className="w-8 h-8">
          {sort ? <TimeIcon /> : <GroupIcon />}
        </button>
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
};

export default PageWrapper;
