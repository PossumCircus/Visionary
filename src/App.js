import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
// import GetSampleBoard from './pages/GetSampleBoard';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
// import Accounts from './pages/Accounts';
// import MakeBoardName from './pages/MakeBoardName';
// import MyVisionBoard from './pages/MyVisionBoard';
// import MyVisionBoardGrid from './pages/MyVisionBoardGrid';
// import VisionBoardGrid from './pages/VisionBoardGrid';
// import Layout from './pages/Layout';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    console.log('App Mounted');
    if (localStorage.getItem('isLogin') == 1) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location.pathname]);

  return (
    // <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* {!isLogin && (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </>
        )} */}
        {/* <Route path="/accountedit" element={<Accounts />} /> */}
        {/* <Route path="/accountedit" element={<Accounts />} />
        <Route path="/getsampleboard" element={<GetSampleBoard />} />
        <Route path="/makeboardName" element={<MakeBoardName />} />
        <Route path="/myvisionboard/list" element={<MyVisionBoard />} />
        <Route path="/myvisionboardgrid/:id" element={<MyVisionBoardGrid />} />
        <Route path="/visionboardgrid" element={<VisionBoardGrid />} /> */}

        <Route path="*" element={<div>부적절한 접근 입니다. 홈 페이지로 이동하시겠습니까?</div>} />
        {/* home으로 돌아가게 링크  */}
      </Routes>
    // </Layout>
  );
}

export default App;
