import { getSession } from './session';
import { prisma } from '../lib/prisma';

export async function getCompanyId() {
  const session = await getSession();

  return session.companyId;
}

export async function getCompanyIdDefault() {
  const company = await prisma.companies.findFirst({
    orderBy: { createdAt: 'asc' },
  });
  return company ? company.id : null;
}
