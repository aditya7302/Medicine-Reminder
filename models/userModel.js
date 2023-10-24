import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: String,
    dose: String,
    frequency: [{
        type: String,
        enum : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    }],
    schedule:{
        hours: {
            type: Number,
            min: 0,
            max: 23
        },
        minutes: {
            type: Number,
            min: 0,
            max: 59 
        },
        seconds: {
            type: Number,
            min: 0,
            max: 59
        }
    }
})


const userSchema = new mongoose.Schema({
    patient_name:{
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true
    },
    phone:{
        type:String,
        required: [true,"phone is required"]
    },
    medicines: [medicineSchema],
    caretaker_name:{
        type: String,
        default: null
    },
    caretaker_email:{
        type:String,
        default: null,
        required: function(){
            return this.caretaker_name!=null;
        },
    },
    caretaker_phone:{
        type:String,
        default: null,
        required: function(){
            return this.caretaker_name!=null;
    }
}
},
{timestamps: true});

export default mongoose.model("Patient",userSchema);