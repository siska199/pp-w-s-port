import FormSignIn from '@components/modules/auth/sign-in/form-sign-in'

const AuthPage = () => {
  return (
    <article className='relative flex flex-col md:flex-row h-full  items-center bg-sport '>
      <div className='bg-glassmorphism  justify-center text-white bottom-0 absolute  flex flex-shrink-0 py-8  max-w-sm  h-full '>
        <FormSignIn className='max-w-sm' />
      </div>
    </article>
  )
}

export default AuthPage
