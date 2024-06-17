import PathComponent from '@/components/ui/containers/path-component';
import ChangePasswordForm from '@/components/forms/change-password-form';
import { getSession } from '@/actions/session';
import { SessionData } from '@/lib/session';

export default async function ChangePassword() {
  const session: SessionData = await getSession();

  return (
    <div>
      <PathComponent />
      <ChangePasswordForm userId={session.id} />
    </div>
  );
}
