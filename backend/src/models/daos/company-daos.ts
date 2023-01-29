import { CompanySchema } from '@/models/schemas/company-schemas';
import { ICompany } from '@/types/sprocket-types';
import { AppErrors, HttpStatusCode } from '@/helpers/app-error';

export const addCompany = async (payload: ICompany) => {
  if (!payload.name || typeof payload.name !== 'string') {
    throw new AppErrors({
      message: 'Name must be a string and can not be empty',
      httpCode: HttpStatusCode.BAD_REQUEST,
      code: 3,
    });
  }

  const newFactory = await CompanySchema.create({ ...payload });
  return newFactory;
};
