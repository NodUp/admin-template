import PathComponent from '@/components/ui/containers/path-component';

import { getSession } from '@/actions/session';
import { SessionData } from '@/lib/session';
import { findById } from '@/actions/users';
import { Label } from '@/components/ui/label';

import { Container } from '@/components/ui/containers/content-container';
import { FormHeader } from '@/components/ui/containers/form-header';
import { GridContainer } from '@/components/ui/containers/grid-container';

export default async function UserProfile() {
  const session: SessionData = await getSession();
  const user = await findById(session.id ? session.id : '');

  return (
    <div>
      <PathComponent />
      <Container className='w-[400px]'>
        <FormHeader title='Perfil' />

        <GridContainer className='mb-4'>
          <Label className=''>Nome:</Label>
          <Label className=''>{user.person[0].name}</Label>

          <Label className=''>Email:</Label>
          <Label className=''>{user.email}</Label>

          <Label className=''>Status:</Label>
          <Label className=''>{user.status}</Label>

          <Label className=''>Tipo:</Label>
          <Label className=''>{user.role}</Label>
        </GridContainer>
      </Container>
    </div>
  );
}
