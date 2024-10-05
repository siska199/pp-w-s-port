import Navbar from '@components/navbar';
import useCurrentPath from '@hooks/useCurrentPath';
import { routes } from '@routes/constant';
import { useAppSelector } from '@store/store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const {
    currentPath: { handle },
  } = useCurrentPath();

  useEffect(() => {
    if (isAuthenticated)
      navigate(routes.personalInformation.fullPath, { replace: true });
  }, [isAuthenticated]);

  return (
    <div className={`bg-sport-plain h-screen  relative  w-full`}>
      <div
        className={`absolute top-0 bg-glassmorphism text-white h-full w-full`}
      >
        {['portofolio', 'project-detail']?.includes(handle?.name) && <Navbar />}
        <Outlet />
      </div>
    </div>

  );
};

export default PublicLayout;
