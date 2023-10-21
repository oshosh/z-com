"use client";

import style from "@/app/(afterLogin)/_component/post.module.css";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function PostArticle({ children }: { children: ReactNode }) {
  const router = useRouter();

  let target = post;
  if (post.Repost) target = post.Repost;

  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };
  return (
    <article className={style.post} onClickCapture={onClick}>
      {children}
    </article>
  );
}
