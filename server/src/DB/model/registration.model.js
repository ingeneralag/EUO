import mongoose from "mongoose";

export const countries = {
    russia: "russia",
    belarus: "belarus",
    cyprus: "cyprus",
    spain: "spain",
    germany: "germany",
    georgia: "georgia",
    hungary: "hungary",
    turkey: "turkey",
    india: "india",
    china: "china",
    malaysia: "malaysia",
    philippines: "philippines",
    egypt: "egypt",
    rwanda: "rwanda"
};

export const majors = [
    "medicine",
    "engineering",
    "dentistry",
    "pharmacy",
    "nursing",
    "humanities",
    "law",
    "accounting",
    "business administration",
    "information technology",
    "languages",
    "marketing",
    "other"
];

export const qualifications = [
    "Select Qualification",
    "High School Certificate",
    "Diploma",
    "Bachelor",
    "Master"
];



const registrationSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        match: /^01[0125][0-9]{8}$/
    },
    country: {
        type: String,
        required: true,
        enum: Object.values(countries)
    },
    major: {
        type: String,
        required: true,
        enum: majors
    },
    qualification: {
        type: String,
        required: true,
        enum: qualifications
    },
    dateOfQualification: { type: Date, required: true }
}, { timestamps: true });

const registrationModel = mongoose.models.Registration || mongoose.model("Registration", registrationSchema);

export default registrationModel;
