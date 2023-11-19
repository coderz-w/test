import { RouterProvider } from 'react-router-dom';
import { router } from './route';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>{router ? <RouterProvider router={router} /> : null}</>,
);
