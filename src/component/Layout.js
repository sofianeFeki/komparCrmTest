import { Outlet } from 'react-router-dom';
import KomparAppBar from './AppBar';
import HomePage from './pages/home';

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
