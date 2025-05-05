'use client';

import { Post as IPost } from '@/model/Post';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import style from './post.module.css';

type Props = {
  children: ReactNode;
  post: IPost;
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  let target = post;
  if (post.Original) {
    target = post.Original;
  }

  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };

  return (
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}
