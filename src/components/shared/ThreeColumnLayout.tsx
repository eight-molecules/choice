import { isValidElement, PropsWithChildren, ReactNode } from "react";

export type ThreeColumnLayoutProps = PropsWithChildren & {
	left?: ReactNode, right?: ReactNode
};

export default function ThreeColumnLayout({ children, left, right }: ThreeColumnLayoutProps) {
	return (
		<div className="h-screen flex m-x-auto">
			{isValidElement(left) && <>
				<div className="container h-full max-w-min">
					{left}
				</div>
			</>}

			<div className="container grow">
				{children}
			</div>

			{isValidElement(right) && <>
				<div className="container h-full max-w-min">
					{right}
				</div>
			</>}
		</div>
	)
}