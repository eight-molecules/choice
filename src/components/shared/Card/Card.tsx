import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren & {
  title: string,
}

export default function Card({ children, title }: CardProps) {
  if (Array.isArray(children)) {
    console.log(children);
  }

  return (
    <div className="rounded overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 rounded">
      <div className="px-6 py-4 bg-gray-200 dark:bg-gray-800 drop-shadow-md">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
        {children}
    </div>
  );
}