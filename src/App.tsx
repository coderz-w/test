import { RouterProvider } from 'react-router-dom';
import { router } from './route';
import './style/index.css';
import { LandScapeProvider } from './provider/Landscape';

export default function App() {
	return (
		<LandScapeProvider>
			<>{router ? <RouterProvider router={router} /> : null}</>
		</LandScapeProvider>
	);
}
