import express from 'express';
import  testPostController  from '../controllers/testController.js';

const router = express.Router();

router.get('/test-post', testPostController)

export default router;

