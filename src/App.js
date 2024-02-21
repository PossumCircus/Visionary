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
import NotFound from './pages/NotFound';


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
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/visionboard" element={<VisionBoard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
