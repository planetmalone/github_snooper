import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Main = () => {
  return (
      <div className="flex h-screen items-stretch">
        <div className="flex-none w-1/3">
          <Sidebar/>
        </div>
        <div className="flex-1">
          <Outlet/>
        </div>
      </div>
  );
};

export default Main;