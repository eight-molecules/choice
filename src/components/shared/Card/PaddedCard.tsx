import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren & {
  title: string,
}

export default function Card({ children, title }: CardProps) {
  return (
    <Card title={title}>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-950">
        {children}
      </div>
    </Card>
  );
}