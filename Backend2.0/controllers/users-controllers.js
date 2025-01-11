import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


import HttpError from "../models/http-error.js";
import { User } from "../models/users.js";


export const getUsers = async (req, res, next) => {
   
    try {
      const user=req.user;
      if(user){
        res.json({
          message:"User details",
    success:true,
    user:user
        })
      }
      else{
        res.json({
          message:"Unauthorized",
    success:false
        })
      }
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
  };

export const register = async (req, res, next) =>{
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError("Invalid inputs passsed, please check your data.",422)
        );
    }
    
    const {name, email, password} = req.body;

    let existingUser;
    
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { email: createdUser.email },
      'dont_share_token',
      { expiresIn: '1h' }
    );

  } catch (err) {
    const error = new HttpError(
      'Signing up failed(token), please try again later.',
      500
    );
    return next(error);
  }
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); 


  res.status(201).json({
    success:true,
    message:"Successfully registered",
    userName: createdUser.name, 
    email: createdUser.email,
    token:token
  });

};

export const login = async (req,res,next) => {

   const {email , password} = req.body;

   let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }
 
  let isValidPassword = false;
  try{
    isValidPassword = await bcrypt.compare(password , existingUser.password);
  } catch(err){
    const error = new HttpError("Could not log you in , check your credentials and try again.",500);
    return next(error);
  }
   
  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {  email: existingUser.email },
      'dont_share_token',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed(token), please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    success:true,
    message:"logging in successful",
    userName:existingUser.name,
    email: existingUser.email,
    token:token
  });

};

export const logout = async (req, res) => {
  res.clearCookie("jwt").json({
      success: true,
      message: "Logout Successfully!"
  });
}
