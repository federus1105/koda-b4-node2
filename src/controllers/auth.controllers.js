import { validationResult } from 'express-validator';
import userModel from '../models/auth.models.js'

/**
 * Register user
 * @typedef {object} Register
 * @property {string} email.required - email
 * @property {string} username.required - username
 * @property {string} password.required - password
 */

/**
 * POST /auth/register
 * @summary Register
 * @tags Auth
 * @param {Register} request.body.required 
 * @return {object} 200 - register response
 * @return {object} 409 - Username already exists
 */
export function Register(req, res) {  
     const results =  validationResult(req)
    if  (!results.isEmpty()) {
        res.json({
            success: false,
            message: 'vaidation error',
            results: results.array()
        })
    }
    const { email, username, password } = req.body;
    const existingUser = userModel.findUser(email);
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'email already exists' 
        });
    }

    let newUser = { email, username, password };
    userModel.users.push(newUser);
    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        results:  { email: newUser.email }
    });
 

/**
 * login user
 * @typedef {object} Login
 * @property {string} email.required - email
 * @property {string} password.required - password
 */}
 
/**
 * POST /auth/login
 * @summary Login
 * @tags Auth
 * @param {Login} request.body.required 
 * @return {object} 200 - register response
 * @return {object} 409 - Username already exists
 */
export function login(req, res) {
    const results =  validationResult(req)
    if  (!results.isEmpty()) {
        res.json({
            success: false,
            message: 'vaidation error',
            results: results.array()
        })
    }
    const { email, password } = req.body;
    const user = userModel.findUser(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ 
            success: false,
            message: 'wrong username or password' 
        });
    }

    res.status(200).json({
         success: true,
         message: 'Login succesfully', 
         results:  { email: user.email }
        });
}
