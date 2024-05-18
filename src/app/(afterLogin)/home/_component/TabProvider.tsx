"use client";

import { ReactNode, createContext, useMemo, useState } from "react";

interface ITabContext {
  tab: "rec" | "fol";
  setTab: (value: "rec" | "fol") => void;
}

export const TabContext = createContext<ITabContext>({
  tab: "rec",
  setTab: () => {},
});

type Props = { children: ReactNode };

export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<"rec" | "fol">("rec");

  const value = useMemo(() => ({ tab, setTab }), [tab]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}
