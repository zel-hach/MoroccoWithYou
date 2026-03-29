import { Category } from '@prisma/client';

export class CreateProviderDto {
  name: string;
  city: string;
  category: Category;
  photo?: string[];
  location: any;
  isActive?: boolean;
}
