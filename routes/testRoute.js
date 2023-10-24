import express from 'express';
import {testController} from '../controllers/testController.js';

//router object
const router = express.Router();

//router
router.get('/', testController);

export default router;
