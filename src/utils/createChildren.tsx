import { RouteObject } from 'react-router-dom';

interface RouteChild {
	name?: string;
	element?: () => JSX.Element;
	children?: {
		[key: string]: RouteChild;
	};
}

export function childrenToArray(root: RouteChild): RouteObject {
	const { name, element = () => null, children } = root;
	const Element = element;
	if (children) {
		return {
			path: name,
			element: <Element />,
			children: Object.entries(children).map(([, value]) => {
				return childrenToArray(value);
			}),
		};
	}
	return {};
}

export function createChildren(modules: Record<string, () => JSX.Element>) {
	const root: RouteChild = {
		name: 'root',
		children: {},
	};
	const paths = Object.keys(modules).filter((v) => v.includes('children'));
	for (const path of paths) {
		const parts = path
			.replace(/\.\/routes(.*)\/index.tsx/, '$1')
			.replace(/\/\[children\]/g, '')
			.split('/')
			.filter(Boolean);
		let currentNode = root;

		for (const part of parts) {
			if (!currentNode.children?.[part]) {
				currentNode.children![part] = {
					name: part,
					children: {},
				};
			}
			currentNode = currentNode.children![part];
			currentNode.element = modules[path];
		}
	}

	return root;
}
