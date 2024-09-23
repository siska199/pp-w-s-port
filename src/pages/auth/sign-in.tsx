import FormSignIn from "@components/modules/sign-in/form-sign-in"
import Image from "@components/ui/image"

const SignInPage = () => {
  return (
    <article className='relative flex flex-col md:flex-row h-full  items-center '>
      <Image  className="flex flex-[0.75] flex-grow" src="background-login.svg"/>
      <FormSignIn className="bg-glassmorphism md:bg-opacity-100 md:bg-white text-white md:text-black bottom-0 absolute md:static flex flex-shrink-0 py-8  w-full md:max-w-sm h-full "/>
    </article>
  )
}

export default SignInPage
