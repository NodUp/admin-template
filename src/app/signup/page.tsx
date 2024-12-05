import { Suspense } from 'react';
import SignUpContainer from '@/components/ui/containers/pages/signup-container';
import LoadingPage from '../loading';

export default function SignUpPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SignUpContainer />
    </Suspense>
  );
}
