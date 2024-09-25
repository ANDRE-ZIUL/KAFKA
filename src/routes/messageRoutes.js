import { Router } from 'express';
import MessageController from '../controllers/MessageController';
const router = new Router();

router.post('/producer', MessageController.producerHandler);
router.get('/consumer', MessageController.consumerHandler)

export default router;
