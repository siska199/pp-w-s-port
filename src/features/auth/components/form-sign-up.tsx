import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useAuthAPI from '@features/auth/apis/use-auth-api'
import signUpSchema, {
  initialFormSignUp,
  TSignUpSchema
} from '@features/auth/validations/sign-up-schema'
import Button from '@components/ui/button'
import Container from '@components/ui/container/container'
import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select/input-select'
import useGeneralAPI from '@apis/use-general-api'

import {
  deepCopy,
  extractValueFromForm,
  filterKeysObject,
  generateOptions,
  mappingErrorsToForm
} from '@lib/helper/function'
import { TEventOnChange } from '@typescript/ui-types'

const FormSignUp = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { getListProfession } = useGeneralAPI()
  const { signUp } = useAuthAPI()
  const [form, setForm] = useState(deepCopy({ ...initialFormSignUp }))

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    handleInitialData()
  }, [])

  const handleInitialData = async () => {
    const currForm = { ...form }

    const listProfession = generateOptions({
      options: (await getListProfession())?.data || []
    })
    currForm.id_profession.options = listProfession
    setForm({
      ...currForm
    })
  }

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
    setIsLoading(true)
    try {
      e?.preventDefault()
      e?.stopPropagation()
      const { isValid, form: updatedForm } = mappingErrorsToForm<TSignUpSchema, typeof form>({
        form,
        schema: signUpSchema
      })

      if (isValid) {
        const payload = extractValueFromForm(deepCopy(updatedForm))
        const result = await signUp({
          ...filterKeysObject({
            object: payload,
            keys: ['confirmation_password']
          })
        })
        if (result?.status) {
          navigate(`${pathname}?type=sign-in`)
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
    <Container variant={'vcc'} gap='base' className={` flex-nowrap `}>
      <div className='text-center space-y-3 w-full'>
        <h5 className='text-body-2xl font-bold'>Sign Up to create your account</h5>
        <p className='text-center text-white'>Welcome back! Please enter your details.</p>
      </div>
      <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-4  px-8'>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <InputBase {...form['first_name']} onChange={handleOnChange} />
            <InputBase {...form['last_name']} onChange={handleOnChange} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <InputBase {...form['email']} onChange={handleOnChange} />
            <InputBase {...form['username']} onChange={handleOnChange} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <InputBase {...form['password']} onChange={handleOnChange} />
            <InputBase {...form['confirmation_password']} onChange={handleOnChange} />
          </div>
          <InputSelect {...form['id_profession']} onChange={handleOnChange} />
        </div>
        <Button type='submit' name='sign-in' className='w-full' isLoading={isLoading}>
          Sign Up
        </Button>
      </form>
      <p className='mx-auto'>
        Already Have an Account?{' '}
        <Button
          type='link'
          variant={'link-white'}
          className='underline'
          to={`${pathname}?type=sign-in`}
          onClick={(e) => e?.stopPropagation()}
        >
          Sign In
        </Button>{' '}
      </p>
    </Container>
  )
}

export default FormSignUp
