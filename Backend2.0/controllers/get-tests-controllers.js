import HttpError from "../models/http-error.js";
import {BP, Lipid, Sugar, Urine} from "../models/tests.js";


export const gethearthealth = async(req,res,next)=>{
   
    const name = req.params.user;
    // console.log(name);
    let hh;
    try{
        hh = await BP.findOne({name: name });
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    
      res.json({hearthealth: hh.toObject({ getters: true }) });
};


export const getLipid = async(req,res,next)=>{
   
    const name = req.params.user;
    // console.log(name);
    let hh;
    try{
        hh = await Lipid.findOne({name: name });
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    
      res.json({lipid: hh.toObject({ getters: true }) });
};

export const getSugar = async(req,res,next)=>{
   
    const name = req.params.user;
    // console.log(name);
    let hh;
    try{
        hh = await Sugar.findOne({name: name });
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    
      res.json({sugar: hh.toObject({ getters: true }) });
};


export const getUrine = async(req,res,next)=>{
   
    const name = req.params.user;
    // console.log(name);
    let hh;
    try{
        hh = await Urine.findOne({name: name });
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    
      res.json({urine: hh.toObject({ getters: true }) });
};