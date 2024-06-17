import ForgotPasswordForm from '@/components/forms/forgot-password-form';
import PublicFooterForm from '@/components/ui/containers/public-footer-form';
import { ComponentContainer } from '@/components/ui/containers/component-container';
import { MainContainer } from '@/components/ui/containers/main-container';

export default function ForgotPassword() {
  return (
    <MainContainer>
      <ComponentContainer>
        <ForgotPasswordForm />
        <PublicFooterForm routes={[{ path: '/', name: 'Login' }]} />
      </ComponentContainer>
    </MainContainer>
  );
}
