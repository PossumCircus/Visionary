import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import VisionBoard from './pages/VisionBoard';
import NotFound from "./pages/NotFound";
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Accounts from './pages/Accounts';
// import GetSampleBoard from './pages/GetSampleBoard';
// import MakeBoardName from './pages/MakeBoardName';
// import MyVisionBoard from './pages/MyVisionBoard';
// import MyVisionBoardGrid from './pages/MyVisionBoardGrid';

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: '/', element: <Home /> },
      { path: '/visionboard', element: <VisionBoard /> },
      { path: '*', element: <NotFound /> }
      //   { path: '/getsampleboard', element: <GetSampleBoard /> },
      //   { path: '/makeboardName', element: <MakeBoardName /> },
      //   { path: '/myvisionboard/list', element: <MyVisionBoard /> },
      //   { path: '/login', element: <SignIn /> },
      //   { path: '/register', element: <SignUp /> },
      //   { path: '/accountedit', element: <Accounts /> },
      //   { path: '/myvisionboardgrid/:id', element: <MyVisionBoardGrid /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <RouterProvider
        router={router}
      // fallbackElement={<Spinner />}
      />
    </React.StrictMode>
  );