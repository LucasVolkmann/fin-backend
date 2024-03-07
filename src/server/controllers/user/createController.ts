import { Request, RequestHandler } from 'express';
import { validateData } from '../../shared/middlewares/validateData';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { createUser } from '../../services/user/createUser';
import { InputUserDTOType } from '../../models/dtos/InputUserDTOType';

interface CreateUserBodyProps extends InputUserDTOType {}

export const createValidator = validateData((getSchema) => ({
  body: getSchema<CreateUserBodyProps>(yup.object().shape({
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const createController: RequestHandler = async (req: Request<unknown, unknown, CreateUserBodyProps>, res) => {

  try {
    if (!req.body) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const userId = await createUser(req.body);
    return res.status(StatusCodes.CREATED).json(userId);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors: error.message});
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors: 'Unexpected error.'});
    }
  }

};