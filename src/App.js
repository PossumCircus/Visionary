import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import VisionBoard from './pages/VisionBoard';

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
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visionboard" element={<VisionBoard />} />
        <Route path="*" element={<div>부적절한 접근 입니다. 홈 페이지로 이동하시겠습니까?</div>} />
        {/* home으로 돌아가게 링크  */}
      </Routes>
    </Layout>
  );
}

export default App;
