import LoginForm from '@/components/forms/login-form';
import PublicFooterForm from '@/components/ui/containers/public-footer-form';
import { ComponentContainer } from '@/components/ui/containers/component-container';
import { MainContainer } from '@/components/ui/containers/main-container';

export default function Home() {
  return (
    <MainContainer>
      <ComponentContainer>
        <LoginForm />
        <PublicFooterForm
          routes={[
            { path: '/signup', name: 'Cadastre-se' },
            { path: '/forgotpassword', name: ' Esqueceu a senha?' },
          ]}
        />
      </ComponentContainer>
    </MainContainer>
  );
}
