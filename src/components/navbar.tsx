'use client';

import { IconHumburger, IconLogout, IconUser } from "@assets/icons";
import Avatar from "@components/ui/avatar";
import DropdownBase, { TOptionDropdown } from "@components/ui/dropdown";
import { route } from "@lib/data/global";
import { handleSetAuth } from "@store/features/auth/authSlice";
import { handleToggleSidebar } from "@store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleOnToggle = () => {
    dispatch(handleToggleSidebar(!isToggleSidebar));
  };

  const handleOnClickItemDropdown = (data:TOptionDropdown)=>{
    switch(data.value){
      case 'profile':
        break;
      case 'logout':
        dispatch(handleSetAuth(false))
        navigate(route.auth.child.signIn.fullPath,{replace:true})
        break;
    }
    
  }

  
  const optionDropdown = useMemo(()=>[
    {
      label     : (<><IconUser/> Change Profile</>),
      value     : "profile",
      className : "border-b",
    },
    {
      label     : (<><IconLogout  /> Sign Out</>),
      value     : "logout",
    },
  ],[])

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
          <DropdownBase 
            options={optionDropdown} 
            onClick={handleOnClickItemDropdown}
            customeClass={{
              containerDropdown:"h-fit my-auto",
              btnDropdown:'rounded-full p-2 my-auto'
            }}
            position="right"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
