import styles from '@/app/(beforeLogin)/_component/beforeLogin.module.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {/* 비포 로그인 레이아웃 */}
      {children}
      {modal}
    </div>
  );
}
