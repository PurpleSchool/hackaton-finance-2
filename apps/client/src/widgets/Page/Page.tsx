import { memo, ReactNode } from 'react';
import './Page.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page = memo((props: PageProps) => {
  const { className, children } = props;
  return <main className={`page ${className || ''}`}>{children}</main>;
});
