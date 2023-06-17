import { FC } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = ({ children }) => {
  return <div>{children}</div>;
};
