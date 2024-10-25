import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import InputBase from '@components/ui/input/input-base';
import InputCheckbox from '@components/ui/input/input-checkbox';
import useFormCustome, { TOnFieldChange } from '@hooks/use-form-custome';
import {
  initialFormLogin,
  loginDefaultValues,
  loginSchema,
  TFormLogin,
} from '@lib/validation/module/auth/login-schema';
import { routes } from '@routes/constant';
import { handleSetAuth } from '@store/modules/auth/auth-slice';
import { useAppDispatch } from '@store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TPropsFormLogin {
  className?: string;
}
const FormLogin = (props: TPropsFormLogin) => {
  const { className } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleSubmit, handleGetAttrs, handleOnChange } = useFormCustome({
    formSchema: loginSchema,
    defaultValues: loginDefaultValues,
    onFieldChange: handleFieldChange,
  });

  const [formStaticAttrs] = useState(initialFormLogin);

  function handleFieldChange(params: TOnFieldChange<TFormLogin>) {
    console.log('params: ', params);
  }

  const handleOnSubmit = handleSubmit(async (data) => {
    console.log('data: ', data);
    dispatch(handleSetAuth(true));
    navigate(routes.personalInformation.fullPath);
  });

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
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 w-full">
        <InputBase
          {...handleGetAttrs('username')}
          {...formStaticAttrs['username']}
          onChange={handleOnChange}
        />
        <InputBase
          {...handleGetAttrs('password')}
          {...formStaticAttrs['password']}
          onChange={handleOnChange}
        />
        <div className="flex justify-between items-center gap-2">
          <InputCheckbox
            {...formStaticAttrs['isRememberMe']}
            {...handleGetAttrs('isRememberMe')}
            value={handleGetAttrs('isRememberMe')?.value || 'false'}
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
