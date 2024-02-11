import mongoose from "mongoose";
//import Double from '@mongoosejs/double';

const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            trim: true, 
            required: "product Name is required"
        },
        description: {
            type: String, 
            //trim: true, 
            required: "Production description is required"
        },
        price: {
            type: Number , 
            default: 0, 
            match:["^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$", 'Please fill a valid price']
        } ,
        quantity: {
            type: Number, 
            default: 0,
            match:["^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$", 'Please fill a valid quantity']
        },
        category: {
            type: String, 
            //trim: true, 
            required: "Production category is required"
        }
    }
);

export default mongoose.model("products", productsSchema);