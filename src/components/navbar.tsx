import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleSetAuth, initialStateAuthStore } from '@features/auth/store/auth-slice';
import Logo from '@components/logo';
import Avatar from '@components/ui/avatar';
import DropdownBase, { TOptionDropdown } from '@components/ui/dropdown';

import useCurrentPath from '@hooks/use-current-path';
import { useAppDispatch, useAppSelector } from '@store/store';
import { handleToggleSidebar } from '@store/ui-slice';
import { routes } from '@routes/constant';
import { IconHumburger, IconLogout, IconUser } from '@assets/icons';

const Navbar = () => {
    const { currentPath } = useCurrentPath();

    const isUsingPublicNavbar = currentPath?.handle?.component?.publicNavbar;

    return (
        <nav className={`p-3 ${isUsingPublicNavbar ? 'fixed' : 'border-b sticky bg-white'}  top-0 z-[3] flex gap-4 items-center`}>
            {isUsingPublicNavbar ? <ContentPortofolio /> : <ContentProtectedRoute />}
        </nav>
    );
};

const ContentProtectedRoute = () => {
    const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state?.auth);

    const handleOnToggle = () => {
        dispatch(handleToggleSidebar(!isToggleSidebar));
    };

    const handleOnClickItemDropdown = (data: TOptionDropdown) => {
        switch (data.value) {
            case 'profile':
                break;
            case 'logout':
                dispatch(handleSetAuth(initialStateAuthStore));
                navigate(routes.auth?.fullPath as string, {
                    replace: true,
                });
                break;
        }
    };

    const optionDropdown = useMemo(
        () => [
            {
                label: (
                    <>
                        <IconUser /> Change Profile
                    </>
                ),
                value: 'profile',
                className: 'border-b',
            },
            {
                label: (
                    <>
                        <IconLogout /> Sign Out
                    </>
                ),
                value: 'logout',
            },
        ],
        [],
    );

    return (
        <div className="px-3 flex justify-between  w-full items-center">
            <IconHumburger className="cursor-pointer" onClick={handleOnToggle} />
            <div className="ml-auto">
                <div className="flex gap-4 ">
                    <Avatar type='initial-name' name={user?.first_name} width={50} height={50} src={user?.image} alt="avatar" className="self-center border-gray-200 rounded-full" />
                    <div className="flex flex-col justify-center space-y-1">
                        <p className="text-black font-semibold">
                            {user?.first_name} {user?.last_name}
                        </p>
                        <p>{user?.profession?.name}</p>
                    </div>
                    <DropdownBase
                        options={optionDropdown}
                        onClick={handleOnClickItemDropdown}
                        customeClass={{
                            containerDropdown: 'h-fit my-auto',
                            btnDropdown: 'rounded-full p-2 my-auto',
                            overlay: 'mt-[1.4rem]',
                        }}
                        position="right"
                    />
                </div>
            </div>
        </div>
    );
};

const ContentPortofolio = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(0);
    };

    return (
        <div className="flex max-w-[1200px] w-full bg-main mx-auto  gap-8 md:py-2 justify-between items-center ">
            <Logo onClick={handleRedirect} className="min-w-[5rem] !text-white cursor-pointer-custome" />
        </div>
    );
};

export default Navbar;
