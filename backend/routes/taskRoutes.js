// import express from 'express';
// import {
//   createTask,
//   getTasks,
//   updateTask,
//   deleteTask,
//   moveTask,
// } from '../controllers/taskController.js';
// import { protect } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, createTask);
// router.get('/', protect, getTasks);
// router.put('/:id', protect, updateTask);
// router.delete('/:id', protect, deleteTask);
// router.patch('/:id/move', protect, moveTask);

// export default router;

import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
} from '../controllers/taskController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/', isAuthenticated, createTask);
router.get('/', isAuthenticated, getTasks);
router.put('/:id', isAuthenticated, updateTask);
router.delete('/:id', isAuthenticated, deleteTask);
router.patch('/:id/move', isAuthenticated, moveTask);

export default router;
