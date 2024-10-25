import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconHumburger, IconLogout, IconUser } from '@assets/icons'
import Logo from '@components/logo'
import Avatar from '@components/ui/avatar'
import DropdownBase, { TOptionDropdown } from '@components/ui/dropdown'
import useCurrentPath from '@hooks/use-current-path'
import { routes } from '@routes/constant'
import { handleSetAuth } from '@store/modules/auth/auth-slice'
import { handleToggleSidebar } from '@store/modules/ui/ui-slice'
import { useAppDispatch, useAppSelector } from '@store/store'

const Navbar = () => {
  const {
    currentPath: { handle }
  } = useCurrentPath()

  const isUsingPublicNavabr = handle?.component?.publicNavbar

  return (
    <nav
      className={`p-3 ${
        isUsingPublicNavabr ? 'fixed' : 'border-b sticky bg-white'
      }  top-0 z-[3] flex gap-4 items-center`}
    >
      {isUsingPublicNavabr ? <ContentPortofolio /> : <ContentProtectedRoute />}
    </nav>
  )
}

const ContentProtectedRoute = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOnToggle = () => {
    dispatch(handleToggleSidebar(!isToggleSidebar))
  }

  const handleOnClickItemDropdown = (data: TOptionDropdown) => {
    switch (data.value) {
      case 'profile':
        break
      case 'logout':
        dispatch(handleSetAuth(false))
        navigate(routes.auth?.child?.signIn?.fullPath as string, {
          replace: true
        })
        break
    }
  }

  const optionDropdown = useMemo(
    () => [
      {
        label: (
          <>
            <IconUser /> Change Profile
          </>
        ),
        value: 'profile',
        className: 'border-b'
      },
      {
        label: (
          <>
            <IconLogout /> Sign Out
          </>
        ),
        value: 'logout'
      }
    ],
    []
  )
  return (
    <div className='px-3 flex justify-between  w-full items-center'>
      <IconHumburger className='cursor-pointer' onClick={handleOnToggle} />
      <div className='ml-auto'>
        <div className='flex gap-4 '>
          <Avatar
            width={50}
            height={50}
            src={'avatar.png'}
            alt='avatar'
            className='self-center border-gray-200 rounded-full'
          />
          <div className='flex flex-col justify-center space-y-1'>
            <p className='text-black font-semibold'>Siska Apriana</p>
            <p>Frontend Developer</p>
          </div>
          <DropdownBase
            options={optionDropdown}
            onClick={handleOnClickItemDropdown}
            customeClass={{
              containerDropdown: 'h-fit my-auto',
              btnDropdown: 'rounded-full p-2 my-auto',
              overlay: 'mt-[1.4rem]'
            }}
            position='right'
          />
        </div>
      </div>
    </div>
  )
}

const ContentPortofolio = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/')
  }

  return (
    <div className='flex max-w-[1200px] w-full bg-main mx-auto  gap-8 md:py-2 justify-between items-center '>
      <Logo onClick={handleRedirect} className='min-w-[5rem] !text-white cursor-pointer-custome' />
    </div>
  )
}

export default Navbar
