import Navbar from '@components/navbar';
import Sidebar from '@components/sidebar';
import { routes } from '@routes/constant';
import { useAppSelector } from '@store/store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Protectedlayout = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated)
      navigate(routes?.auth?.child?.signIn?.fullPath || '', { replace: true });
  }, []);

  return (
    <main className="w-full  flex  max-h-screen relative ">
      <Sidebar />
      <div className="flex-grow relative overflow-x-auto min-h-full max-w-full w-full ">
        <Navbar />
        <div className=" max-w-full w-full overflow-auto flex-grow min-h-[calc(100%-5rem)]  h-[calc(100%-5rem)] max-h-[calc(100%-5rem)]  px-4 pt-4 md:px-8 md:pt-8 ">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Protectedlayout;
