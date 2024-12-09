import { useSearchParams } from 'react-router-dom'

import FormSignIn from '@features/auth/components/form-sign-in'
import FormSignUp from '@features/auth/components/form-sign-up'

import { cn } from '@lib/helper/function'

type TTypeAuth = 'sign-in' | 'sign-up' | 'forgot-password'

const AuthPage = () => {
  const [searchParams] = useSearchParams()
  const type = (searchParams?.get('type') || '') as TTypeAuth

  return (
    <article className='relative flex flex-col md:flex-row h-full  items-center bg-sport '>
      <div
        className={cn({
          'bg-glassmorphism  justify-center text-white bottom-0 absolute  flex flex-shrink-0 py-8   max-w-sm  h-full':
            true,
          'max-w-[35rem]': type == 'sign-up'
        })}
      >
        {['', 'sign-in']?.includes(type) ? <FormSignIn /> : null}
        {type === 'sign-up' ? <FormSignUp /> : null}
      </div>
    </article>
  )
}

export default AuthPage
