import { PropsWithChildren } from "react";

export default function Pill({ children }: PropsWithChildren) {
  return (<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{children}</span>)
}