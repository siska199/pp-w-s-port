'use client';

import { IconChevronDown, IconHumburger } from "@assets/icons";
import Avatar from "@components/ui/avatar";
import { handleToggleSidebar } from "@store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@store/store";


const Navbar = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const dispatch = useAppDispatch();

  const handleOnToggle = () => {
    dispatch(handleToggleSidebar(!isToggleSidebar));
  };

  return (
    <nav className="px-6 py-3 sticky bg-white top-0 flex gap-4 items-center">
      <IconHumburger className="cursor-pointer" onClick={handleOnToggle} />
      <div className="ml-auto">
        <div className="flex gap-4 ">
          <Avatar
            width={50}
            height={50}
            src={'avatar.png'}
            alt="avatar"
            className="self-center border-gray-200 rounded-full"
          />
          <div className="flex flex-col justify-center space-y-1">
            <p className="text-black font-semibold">Siska Apriana</p>
            <p>Frontend Developer</p>
          </div>
          <div className="my-auto border rounded-full w-fit h-fit p-2  cursor-pointer-custome">
            <IconChevronDown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
