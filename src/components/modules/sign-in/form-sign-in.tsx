import { loginSchema, TFormLogin } from "@lib/schema-validation/auth-schema";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputBase from "@components/ui/input/input-base";
import { excludeRef } from "@lib/helper";
import Container from "@components/ui/container";
import Image from "@components/ui/image";
import Button from "@components/ui/button";
import InputCheckbox from "@components/ui/input/input-checkbox";


const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TFormLogin>({
    resolver: zodResolver(loginSchema, {}, { raw: true }),
    defaultValues: {
      username: '',
      password: '',
      isRememberMe: undefined,
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof TFormLogin;
    const value = e.target.value;
    setValue(name, value);
  };

  const handleOnSubmit: SubmitHandler<TFormLogin> = async (data) => {
    try {
      console.log('data: ', data);
    } catch (error: any) {
      console.log('error: ', error?.message);
    }
  };

  return (
    <Container variant={'vcc'} gap="base" className="max-w-md px-8">
      <Image
        src={'logo.png'}
        alt="Dev port Logo"
        className="rounded-md shadow-sm w-10 h-10"
      />
      <div className="text-center space-y-3 w-full">
        <h5 className="text-body-2xl font-bold"> Sign in to your account</h5>
        <p className="text-center">Welcome back! Please enter your details.</p>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-4 w-full">
        <InputBase
          label="Username"
          {...excludeRef(register('username'))}
          value={watch('username')}
          onChange={handleOnChange}
          errorMessage={errors?.username?.message}
        />
        <InputBase
          label="Password"
          type="password"
          {...excludeRef(register('password'))}
          value={watch('password')}
          onChange={handleOnChange}
          errorMessage={errors?.password?.message}
        />
        <div className="flex justify-between items-center gap-2">
          <InputCheckbox
            customeClassnameCheckbox={{ container: 'w-fit' }}
            label={'Remember me for 30 days'}
            {...excludeRef(register('isRememberMe'))}
            value={String(watch('isRememberMe'))}
          />
          <Button variant={'link-black'} className=" underline !p-0" href={'/auth/forget-password'}>
            Forget Password
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default FormLogin;
