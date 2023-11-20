import { ReactNode, useEffect } from 'react';
// eslint-disable-next-line
export function LandScapeProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		resize();
		window.addEventListener('orientationchange', resize); //监听旋转方向
	}, []);

	function resize() {
		const root = document.querySelector('.root');
		if (window.orientation == 180 || window.orientation == 0) {
			root &&
				root.setAttribute(
					'style',
					' transform: rotate(90deg);transform-origin: 0% 100%;top: -100vw;position: absolute;height: 100vw;width: 100vh;overflow-y: hidden;',
				);
		}
		if (window.orientation == 90 || window.orientation == -90) {
			root &&
				root.setAttribute(
					'style',
					'transform: unset; transform-origin: unset; top: 0; left: 0; position: absolute; height: 100%; width: 100%; overflow-x: hidden;',
				);
		}
	}

	return <div className=" w-[100vmax] h-[100vmin]">{children}</div>;
}
