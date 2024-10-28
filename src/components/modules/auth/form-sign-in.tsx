import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@components/ui/button'
import Container from '@components/ui/container/container'
import InputBase from '@components/ui/input/input-base'
import InputCheckbox from '@components/ui/input/input-checkbox'

import { handleSetAuth } from '@store/modules/auth/auth-slice'
import { useAppDispatch } from '@store/store'
import { mappingErrorsToForm } from '@lib/helper'
import {
  initialFormSignIn,
  signInSchema,
  TFormLSignIn
} from '@lib/validation/module/auth/sign-in-schema'
import { routes } from '@routes/constant'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

interface TPropsFormLogin {
  className?: string
}
const FormLogin = (props: TPropsFormLogin) => {
  const { className } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [form, setForm] = useState(initialFormSignIn)

  const handleOnChange = (e: TEventOnChange) => {
    const currForm = form
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    currForm[name].value = value

    setForm({
      ...currForm
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const { isValid, updatedForm } = mappingErrorsToForm<TFormLSignIn, typeof form>({
      form,
      schema: signInSchema
    })

    if (isValid) {
      dispatch(handleSetAuth(true))
      navigate(routes.personalInformation.fullPath)
    }
    setForm({
      ...updatedForm
    })
  }

  return (
    <Container variant={'vcc'} gap='base' className={` flex-nowrap px-8 ${className}`}>
      <div className='text-center space-y-3 w-full'>
        <h5 className='text-body-2xl font-bold'>Sign in to your account</h5>
        <p className='text-center text-white'>Welcome back! Please enter your details.</p>
      </div>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 w-full'>
        <InputBase {...form['username']} onChange={handleOnChange} />
        <InputBase {...form['password']} onChange={handleOnChange} />
        <div className='flex justify-between items-center gap-2'>
          <InputCheckbox {...form['isRememberMe']} onChange={handleOnChange} />
          <Button
            variant={'link-black'}
            className=' text-white  underline !p-0'
            href={'/auth/forget-password'}
          >
            Forget Password
          </Button>
        </div>
        <Button type='submit' className='w-full'>
          Sign In
        </Button>
      </form>
    </Container>
  )
}

export default FormLogin
