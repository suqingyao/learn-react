import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom';

function Aaa() {
  return (
    <div>
      <p>aaa</p>
      <Link to={'/bbb/111'}>to bbb</Link>
      <br />
      <Link to={'/ccc'}>to ccc</Link>
      <br />
      <Outlet />
    </div>
  );
}

function Bbb() {
  return 'bbb';
}

function Ccc() {
  return 'ccc';
}

function ErrorPage() {
  return 'error';
}

const routes = [
  {
    path: '/',
    element: <Aaa />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'bbb/:id',
        element: <Bbb />
      },
      {
        path: 'ccc',
        element: <Ccc />
      }
    ]
  }
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
