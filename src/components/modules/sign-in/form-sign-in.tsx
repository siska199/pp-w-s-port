import Button from '@components/ui/button';
import Container from '@components/ui/container';
import InputBase from '@components/ui/input/input-base';
import InputCheckbox from '@components/ui/input/input-checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { routes } from '@routes/constant';
import { excludeRef } from '@lib/helper';
import { loginSchema, TFormLogin } from '@lib/schema-validation/auth-schema';
import { handleSetAuth } from '@store/features/auth/authSlice';
import { useAppDispatch } from '@store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface TPropsFormLogin {
  className?: string;
}
const FormLogin = (props: TPropsFormLogin) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { className } = props;
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
      isRememberMe: 'false',
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof TFormLogin;
    const value = e.target.value;
    setValue(name, value);
  };

  const handleOnSubmit: SubmitHandler<TFormLogin> = async (data) => {
    try {
      dispatch(handleSetAuth(true));
      navigate(routes.personalInformation.fullPath);
    } catch (error: any) {
      console.log('error: ', error?.message);
    }
  };

  return (
    <Container
      variant={'vcc'}
      gap="base"
      className={` flex-nowrap px-8 ${className}`}
    >
      <div className="text-center space-y-3 w-full">
        <h5 className="text-body-2xl font-bold"> Sign in to your account</h5>
        <p className="text-center text-white">
          Welcome back! Please enter your details.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-4 w-full"
      >
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
            onChange={handleOnChange}
          />
          <Button
            variant={'link-black'}
            className=" text-white  underline !p-0"
            href={'/auth/forget-password'}
          >
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
