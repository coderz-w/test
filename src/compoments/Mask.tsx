import { ReactNode, useRef } from 'react';
import { useClickAway } from 'ahooks';

export default function Mask({
	children,
	returnCallback,
}: {
	children: ReactNode;
	returnCallback: () => void;
}) {
	const divRef = useRef<HTMLDivElement>(null);
	useClickAway(() => {
		returnCallback();
	}, divRef);
	return (
		<div className=" fixed z-40 w-[100%] h-[100%] bg-[#86909c]/10 left-0 top-0 flex justify-center items-center opacity-50">
			<div className=" flex items-center z-50 " ref={divRef}>
				{children}
			</div>
		</div>
	);
}
