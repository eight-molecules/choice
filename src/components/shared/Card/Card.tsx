import { PropsWithChildren, ReactNode } from "react";


const CardHeader = ({ children }) => {
  return <div className="px-6 py-4 bg-gray-200 dark:bg-gray-800 drop-shadow-md">
        <div className="font-bold text-xl mb-2">{children}</div>
      </div>
}

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded overflow-hidden shadow-lg border bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 rounded">
        {children}
    </div>
  );
}

Card.Header = CardHeader;
export default Card;