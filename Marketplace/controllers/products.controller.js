import products from "../models/products.model.js";
import extend from 'lodash/extend.js'
import errorHandler from "./../helpers/dbErrorHandler.js";


const list = async(req, res) => {
    try{
        //console.log("products > list");
        //console.log(req.query.name);
        let queryAry = {};
        if (req.query.name){
            queryAry["name"] = {'$regex': req.query.name};
        }
        //console.log(queryAry);
        let myList = await products.find(queryAry).select("name description price quantity category");
        res.json(myList);
       
    }
    catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const read = async(req, res) => {
    try{
        console.log("products > read");
        return res.json(req.profile);
    }
    catch(err){
        return res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
};

const recordById = async(req, res, next, id) => {
    try{
        console.log("products > recordById");
        let selRecord = await products.findById(id);
        if (!selRecord){
            throw Error("Record not found");
        }
        //console.log("readById > after error");
        req.profile = selRecord;
        //console.log("readById > after profile");
        next();
        //console.log("readById > after next");
    }
    catch(err){
        return res.status(400).json(
            {error: errorHandler.getErrorMessage(err)}
        );
    }
}

const create = async(req, res)=>{
    try{
        console.log("products > create");
        const newRecord = new products(req.body);
        await newRecord.save();
        return res.status(200).json({message: "Record is added"});
    }
    catch(err){
        res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
}

const update = async(req, res) =>{
    try{
        console.log("products > update");
        //get the selected record
        let selRecord = req.profile;
        selRecord = extend(selRecord, req.body);
        await selRecord.save();

        res.json(selRecord);
    }
    catch(err){
        res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
}

const remove = async(req, res)=>{
    try{
        console.log("products > remove");
        //get the selected record
        let selRecord = req.profile;
        //delete & assign the deleted reccord to "deletedRecord"
        let deletedRecord = await selRecord.deleteOne();
        res.json(deletedRecord);
    }
    catch(err){
        res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
}

const removeAll = async(req, res)=>{
    try{
        console.log("products > remove all");
        let isDeleted = await products.deleteMany();
        
        res.json(isDeleted);
    }
    catch(err){
        res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
}

const search = async(req, res) =>{
    try{
        
        console.log("products > search");
        res.json(req);
    }
    catch(err){
        res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
}


const searchNN = async(req, res, next, name) => {
    try{
        console.log("products > searchNN");
        next();   
    }
    catch(err){
        return res.status(400).json(
            {error: errorHandler.getErrorMessage(err)}
        );
    }
}

export default {recordById, search, searchNN, list, read, create, update, remove, removeAll};