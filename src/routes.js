import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', adminMiddleware, DeliverymanController.index);
routes.post('/deliverymen', adminMiddleware, DeliverymanController.store);
routes.put('/deliverymen/:id', adminMiddleware, DeliverymanController.update);
routes.delete(
  '/deliverymen/:id',
  adminMiddleware,
  DeliverymanController.delete
);

export default routes;
