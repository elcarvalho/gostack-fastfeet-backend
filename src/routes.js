import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliverymanOrderController from './app/controllers/DeliverymanOrderController';
import OrderStatusController from './app/controllers/OrderStatusController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients/:id?', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen/:id?', adminMiddleware, DeliverymanController.index);
routes.post('/deliverymen', adminMiddleware, DeliverymanController.store);
routes.put('/deliverymen/:id', adminMiddleware, DeliverymanController.update);
routes.delete(
  '/deliverymen/:id',
  adminMiddleware,
  DeliverymanController.delete
);

routes.get('/orders/', adminMiddleware, OrderController.index);
routes.post('/orders', adminMiddleware, OrderController.store);
routes.put('/orders/:id', adminMiddleware, OrderController.update);
routes.delete(
  '/orders/:id/cancel-delivery',
  adminMiddleware,
  OrderController.delete
);

routes.get(
  '/deliveryman/:deliverymanId/orders',
  DeliverymanOrderController.index
);
routes.get(
  '/deliveryman/:deliverymanId/delivered',
  DeliverymanOrderController.show
);

routes.post('/order/:id/start', OrderStatusController.store);
routes.put(
  '/order/:id/end',
  upload.single('signature'),
  OrderStatusController.update
);

routes.get('/deliveries/problems', DeliveryProblemController.index);
routes.get('/deliveries/:order_id/problems', DeliveryProblemController.show);
routes.post('/deliveries/:order_id/problems', DeliveryProblemController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
