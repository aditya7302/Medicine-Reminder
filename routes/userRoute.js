import express from 'express';
import {addPatient, getAllPatient} from '../controllers/userController.js';

//router object 
const router = express.Router();


//routing
//ADD PATIENT || METHOD POST
router.post('/',addPatient);

//GET ALL PATIENT
router.get('/',getAllPatient);

export default router;