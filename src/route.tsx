import { createHashRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { childrenToArray, createChildren } from './utils/createChildren';
const routeModule: Record<string, () => JSX.Element> = import.meta.glob('./routes/**/*.tsx', {
	eager: true,
	import: 'default',
});
const modules = Object.entries(routeModule);
const pathRegExp = /\.\/routes(.*).tsx/;
const defaultRoutes: RouteObject[] = modules
	.filter(([path]) => !path.includes('children'))
	.map((v) => {
		const [path, Element] = v;
		const pathLike = path.replace(pathRegExp, '$1');
		let routePath = /\/index/.test(pathLike) ? pathLike.replace(/\/index/, '') : pathLike;
		if (/\[\w+\]/.test(pathLike)) {
			const slug = pathLike.replace(/.*\[(\w+)\]/, '$1');
			routePath = pathLike.replace(/\[\w+\]/, `:${slug}`);
		}
		// console.log(path.split("/").filter(Boolean));
		const route: RouteObject = {
			path: routePath,
			element: <Element />,
			errorElement: <div />,
		};
		return route;
	});
const childrenRoutes = createChildren(routeModule);
const { children = [] } = childrenToArray(childrenRoutes);
defaultRoutes.forEach((v1) => {
	children.forEach((v2) => {
		if (v1.path?.endsWith(v2.path!)) v1.children = v2.children;
	});
});
export const routes: RouteObject[] = [...defaultRoutes];
console.log(routes);
export const router = createHashRouter(routes);
