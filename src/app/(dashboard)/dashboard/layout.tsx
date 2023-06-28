import { FC, ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <section className="pt-20">{children}</section>;
};

export default layout;
