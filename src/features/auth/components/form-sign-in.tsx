import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useAuthAPI from '@features/auth/apis/use-auth-api'
import signInSchema, {
  initialFormSignIn,
  TSignInSchema
} from '@features/auth/validations/sign-in-schema'
import Button from '@components/ui/button'
import Container from '@components/ui/container/container'
import InputBase from '@components/ui/input/input-base'
import InputCheckbox from '@components/ui/input/input-checkbox'

import STORAGE_VARIABLE from '@lib/config/storage-variable'
import {
  deepCopy,
  extractValueFromForm,
  filterKeysObject,
  mappingErrorsToForm
} from '@lib/helper/function'
import { setItemSecureWebstorage } from '@lib/helper/secure-storage'
import { routes } from '@routes/constant'
import { TEventOnChange } from '@typescript/ui-types'

const FormSignIn = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { signIn } = useAuthAPI()
  const [form, setForm] = useState(deepCopy({ ...initialFormSignIn }))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setItemSecureWebstorage(STORAGE_VARIABLE.IS_REMEMBER_ME, false)
  }, [])

  const handleOnChange = useCallback(async (e: TEventOnChange) => {
    const currForm = form
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    currForm[name].value = value

    if (name === 'is_remember_me') {
      setItemSecureWebstorage(
        STORAGE_VARIABLE.IS_REMEMBER_ME,
        Boolean(value === 'true' ? true : false)
      )
    }

    setForm({
      ...currForm
    })
  }, [])

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    try {
      e?.preventDefault()
      const { isValid, form: updatedForm } = mappingErrorsToForm<TSignInSchema, typeof form>({
        form,
        schema: signInSchema
      })

      if (isValid) {
        const payload = extractValueFromForm(deepCopy(updatedForm))
        const result = await signIn({
          username: payload.username,
          password: payload.password
        })
        if (result?.status) {
          const isRememberMe = payload?.is_remember_me === 'false' ? false : true
          setItemSecureWebstorage(STORAGE_VARIABLE.IS_REMEMBER_ME, isRememberMe)
          setItemSecureWebstorage(
            STORAGE_VARIABLE.AUTH,
            {
              isAuthenticated: result?.status,
              token: result?.data?.token,
              user: filterKeysObject({
                object: { ...result?.data },
                keys: ['token']
              }),
              isRememberMe
            },
            isRememberMe ? localStorage : sessionStorage
          )

          navigate(routes.personalInformation.fullPath)
          navigate(0)
        }
      }
      setForm({
        ...updatedForm
      })
    } catch (error: any) {
      console.log('error: ', error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container variant={'vcc'} gap='base' className={` flex-nowrap  max-w-sm `}>
      <div className='text-center space-y-3 w-full'>
        <h5 className='text-body-2xl font-bold'>Sign in to your account</h5>
        <p className='text-center text-white'>Welcome back! Please enter your details.</p>
      </div>
      <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-4  px-8'>
        <InputBase {...form['username']} onChange={handleOnChange} />
        <InputBase {...form['password']} onChange={handleOnChange} />
        <div className='flex justify-between items-center gap-2'>
          <InputCheckbox {...form['is_remember_me']} onChange={handleOnChange} />
          <Button
            variant={'link-black'}
            className=' text-white  underline !p-0'
            href={'/auth/forget-password'}
            name='forgot-password'
          >
            Forget Password
          </Button>
        </div>
        <Button type='submit' name='sign-in' className='w-full' isLoading={isLoading}>
          Sign In
        </Button>
      </form>
      <p className='mx-auto'>
        Don't Have an Account?{' '}
        <Button
          type='link'
          variant={'link-white'}
          className='underline'
          to={`${pathname}?type=sign-up`}
          onClick={(e) => e?.stopPropagation()}
        >
          Sign Up
        </Button>{' '}
      </p>
    </Container>
  )
}

export default FormSignIn
