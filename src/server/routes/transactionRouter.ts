import express from 'express';
import { TransactionController } from '../controllers/transaction';
import { ensureAuth } from '../shared/middlewares/ensureAuth';

const transactionRouter = express.Router();

export enum TransactionRoutesEnum {
  TRANSACTION = '/transaction',
  TRANSACTION_ID = '/transaction/:id',
}

transactionRouter.get(TransactionRoutesEnum.TRANSACTION,
  ensureAuth,
  TransactionController.getAllValidator,
  TransactionController.getAll,
);

transactionRouter.get(`${TransactionRoutesEnum.TRANSACTION}/history`,
  ensureAuth,
  TransactionController.getMonthlyHistory,
);

transactionRouter.post(TransactionRoutesEnum.TRANSACTION,
  ensureAuth,
  TransactionController.createValidator,
  TransactionController.create
);

transactionRouter.put(TransactionRoutesEnum.TRANSACTION,
  ensureAuth,
  TransactionController.updateValidator,
  TransactionController.update,
);

transactionRouter.get(TransactionRoutesEnum.TRANSACTION_ID,
  ensureAuth,
  TransactionController.getByIdValidator,
  TransactionController.getById,
);

transactionRouter.delete(TransactionRoutesEnum.TRANSACTION_ID,
  ensureAuth,
  TransactionController.deleteByIdValidator,
  TransactionController.deleteById,
);

export default transactionRouter;

