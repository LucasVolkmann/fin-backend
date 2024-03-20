import { CategoryService } from '.';
import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';
import { CategoryNameAlreadyInUseError } from '../../shared/exceptions/CategoryNameAlreadyInUseError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';

export const create = async (name: string, userId: number): Promise<number | void> => {

  const recoveryCategory = await CategoryService.getByName(userId, name);
  if (recoveryCategory) {
    throw new CategoryNameAlreadyInUseError();
  }

  const newCategory = await AppDataSource
    .getRepository(Category)
    .save({
      name,
      user: {
        id: userId
      }
    });

  if (!newCategory.id) {
    throw new InternalServerError('Error while creating a category.');
  }
  return newCategory.id;

};
