import { Router } from 'express';
import { authRequire }from '../middlewares/validateToken.js'

const router = Router();

router.get('/tasks', authRequire, (res, req) => res.send('tasks'));

export default router;