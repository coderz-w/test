import { useEffect, useRef, useState } from 'react';
import { useScroll, useLongPress } from 'ahooks';

const Page1 = () => {
	const x = useRef(100);
	const huo = useRef<HTMLDivElement>(null);
	const mainBox = useRef<HTMLDivElement>(null);
	const timer = useRef<NodeJS.Timeout>(null);
	const scroll = useScroll(mainBox);
	const [longPress, setLongPress] = useState<boolean>(false);
	useLongPress(() => setLongPress(true), mainBox, {
		onLongPressEnd() {
			console.log(mainBox.current?.scrollLeft);
			timer.current = setTimeout(() => {
				setLongPress(false);
				mainBox.current?.scrollLeft && (x.current = mainBox.current?.scrollLeft);

				timer.current = null;
			}, 2000);
		},
	});
	function turn(x: number | string) {
		x = Number(x);
		return 0.00012499999999999962 * x * x * x - 0.08750000000000001 * x * x + 18.5 * x - 900;
	}
	useEffect(() => {
		let animationId: number;

		const animate = () => {
			if (!longPress) {
				// console.log(longPress);
				x.current = x.current + 1;
				mainBox.current && (mainBox.current.scrollLeft = x.current);
			}
			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationId);
		};
	}, [longPress]);
	useEffect(() => {
		let animationId: number;

		const animate = () => {
			x.current = x.current + 1;
			scroll && huo.current && (huo.current.style.left = scroll.left + 300 + 'px');
			scroll && huo.current && (huo.current.style.top = turn(scroll.left) + 'px');

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationId);
		};
	}, [scroll]);

	return (
		<div
			className="w-[100vmax] h-[100vmin] overflow-x-auto overflow-y-hidden relative"
			ref={mainBox}
		>
			<div className="w-5 h-5 absolute bg-slate-950 transform-cpu duration-100" ref={huo}></div>
			page1
			<div className="w-[10000px] h-[100vmin]"></div>
		</div>
	);
};

export default Page1;
