import { PropsWithChildren, ReactNode } from "react";

const PageLayout = ({ children, header }: PropsWithChildren<{ header?: ReactNode }>) => {
  return (<div>
      {header}
    <div className="w-full h-full overflow-auto bg-gray-50 dark:bg-gray-950">
      {children}
    </div>
    </div>
  );
}

export default PageLayout;