import express from 'express';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';
import twilio from 'twilio';

dotenv.config();


const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const fromPhone = process.env.TWILLIO_PHONE;

//twilio
const client = twilio(accountSid, authToken);

const sendSMS = async (body,toPhone) => {
    let msgOptions = {
        from: fromPhone,
        to: '+91'+toPhone,
        body
    }
    try{
        const message = await client.messages.create(msgOptions);
        console.log(message);
    }catch(error){
        console.log(error);
    }
}

const getString = (dayOfWeek) => {
    if(dayOfWeek == 0) return "Sunday";
    if(dayOfWeek == 1) return "Monday";
    if(dayOfWeek == 2) return "Tuesday";
    if(dayOfWeek == 3) return "Wednesday";
    if(dayOfWeek == 4) return "Thursday";
    if(dayOfWeek == 5) return "Friday";
    if(dayOfWeek == 6) return "Saturday";
}

export const notificationWorker = async () => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const searchString = getString(dayOfWeek);
    const allUser = await userModel.find();
    allUser.forEach((user) => {
        const userMedicine = user.medicines;
        const medicineMessage = [];
        const templateForPatient = `Hello ${user.patient_name}. We hope you are doing well. Here is your reminder for medicine intake. Today you have to take`;
        const templateForCaretaker = `Hello ${user.caretaker_name}. We hope you are doing well. Here is a reminder for Patient for medicine intake. Today you have to take`;
        let message = ``;
        userMedicine.forEach((medicine) => {
            const frequency = medicine.frequency;
            if(frequency.includes(searchString)){
                medicineMessage.push(medicine);
                message = message + ` ,Medicine Name : ${medicine.name} with Dose : ${medicine.dose} at ${medicine.schedule.hours}:${medicine.schedule.minutes}:${medicine.schedule.seconds}`;
            }
        })
        if(medicineMessage.length!==0){
            sendSMS(templateForPatient+message,user.phone);
            if(user.caretaker_phone!==null){
                sendSMS(templateForCaretaker+message,user.caretaker_phone);
            }
        }
    })
}
