import userModel from '../models/userModel.js';

export const addPatient = async (req,res) => {
    try{
        const {patient_name, email, phone, medicines, caretaker_name, caretaker_email, caretaker_phone} = req.body;

        console.log({
            patient_name,
            email,
            phone,
            medicines,
            caretaker_name
        })
        //check user
        const existingUser = await userModel.findOne({ email });

        //existing user

        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "A user is already registered with this email"
            });
        }

        const user = await new userModel({
            patient_name,
            email,
            phone,
            medicines,
            caretaker_name,
            caretaker_email,
            caretaker_phone
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding Patient",
            error
        })
    }
}


export const getAllPatient = async(req,res) => {
    try{
        const patients = await userModel.find({});
        return res.status(200).send({
            success: true,
            message: "get all patients successfully",
            patients,
          });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching all Patients",
            error
        })
    }
}