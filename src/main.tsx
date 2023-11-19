import { RouterProvider } from 'react-router-dom';
import { router } from './route';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
	<>{router ? <RouterProvider router={router} /> : null}</>,
);
