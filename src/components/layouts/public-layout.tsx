import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from '@components/navbar';

import useCurrentPath from '@hooks/use-current-path';
import { useAppSelector } from '@store/store';
import { routes } from '@routes/constant';

const PublicLayout = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const { currentPath } = useCurrentPath();

    useEffect(() => {
        if (isAuthenticated && !currentPath?.handle?.isOpenRoute) navigate(routes.personalInformation.fullPath, { replace: true });
    }, [isAuthenticated]);

    return (
        <div className={`bg-sport-plain h-screen  relative  w-full`}>
            <div className={`absolute top-0 bg-glassmorphism text-white h-full w-full`}>
                {['portofolio']?.includes(currentPath?.handle?.name) && <Navbar />}
                <Outlet />
            </div>
        </div>
    );
};

export default PublicLayout;
