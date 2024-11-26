import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthAPI from '@features/auth/apis/use-auth-api'
import { handleSetAuth } from '@features/auth/store/auth-slice'
import signInSchema, {
  initialFormSignIn,
  TSignInSchema
} from '@features/auth/validations/sign-in-schema'
import Button from '@components/ui/button'
import Container from '@components/ui/container/container'
import InputBase from '@components/ui/input/input-base'
import InputCheckbox from '@components/ui/input/input-checkbox'

import { useAppDispatch } from '@store/store'
import { extractValueFromForm, mappingErrorsToForm } from '@lib/helper/function'
import { routes } from '@routes/constant'
import { TEventOnChange } from '@typescript/ui-types'

const FormSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { signIn } = useAuthAPI()
  const [form, setForm] = useState(initialFormSignIn)

  const handleOnChange = useCallback(async (e: TEventOnChange) => {
    const currForm = form
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    currForm[name].value = value
    setForm({
      ...currForm
    })
  }, [])

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const { isValid, form: updatedForm } = mappingErrorsToForm<TSignInSchema, typeof form>({
      form,
      schema: signInSchema
    })

    if (isValid) {
      const payload = extractValueFromForm(updatedForm)
      const result = await signIn({
        username: payload.username,
        password: payload.password
      })
      dispatch(
        handleSetAuth({
          isAuthenticated: result?.sucess,
          token: result?.data?.token,
          user: result?.data?.user
        })
      )
      navigate(routes.personalInformation.fullPath)
    } else {
      setForm({
        ...updatedForm
      })
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
        <Button type='submit' name='sign-in' className='w-full'>
          Sign In
        </Button>
      </form>
    </Container>
  )
}

export default FormSignIn
