import { PropsWithChildren, ReactNode } from "react";


const CardHeader = ({ className = '', children, left, right }: PropsWithChildren<{ className?: string, left?: ReactNode, right?: ReactNode }>) => {
  return (
    <div className={`px-6 py-4 bg-gray-200 dark:bg-gray-800 drop-shadow-md border-b border-gray-300 dark:border-gray-700 ${className}`}>
      <div className="font-bold text-xl mb-2 flex">
        {left && <div className="flex-shrink">
          {left}
        </div>}
        <div className="flex-grow">
          {children}
        </div>
        {right && <div className="flex-shrink">
          {right}
        </div>}
      </div>
    </div>
  );
}

const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string}>) => {
  return (
    <div className={`rounded overflow-hidden shadow-lg border bg-gray-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 rounded ${className}`}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
export default Card;