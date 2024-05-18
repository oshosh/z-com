"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { usePathname } from "next/navigation";
import style from "./trendSection.module.css";

export default function TrendSection() {
  const pathname = usePathname();
  if (pathname === "/explore") return null;
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드 섹션</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
