import { ReactNode } from "react";

/**
 * (afterLogion Layout)
 * app router와 관계 없이 레이아웃은 전역 적용 됨
 */
export default function AfterLoginLayout({children}: {children: ReactNode}) {
  return (
    <div>
      애프터 로그인 레이아웃
      {children}
    </div>
  )
}