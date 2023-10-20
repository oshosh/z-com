'use client'

import { useRouter } from "next/navigation";
import BeforeLogin from "@/app/(beforeLogin)/_component/BeforeLogin";

export default function Logion() {
  const router = useRouter();
  router.replace('/i/flow/login');

  return (
    <BeforeLogin />
  );
}