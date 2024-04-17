import { FC, ReactNode } from "react";
import Navbar from "~/components/Navbar";

type Props = {
  sort: boolean;
  setSort: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
};
const PageWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="sm:py-5 mx-auto sm:max-w-96">
      <Navbar />
      {/* <div className="flex justify-end">
        <button onClick={() => setSort(!sort)} className="w-8 h-8">
          {sort ? <TimeIcon /> : <GroupIcon />}
        </button>
      </div> */}
      <div className="px-2 pt-5">{children}</div>
    </div>
  );
};

export default PageWrapper;
