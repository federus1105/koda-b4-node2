import { validationResult } from 'express-validator';
import userModel from '../models/auth.models.js'
import { getPrisma } from '../libs/prisma.js';

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
export async function Register(req, res) {  
    const prisma = getPrisma();
     const results =  validationResult(req)
    if  (!results.isEmpty()) {
        res.json({
            success: false,
            message: 'vaidation error',
            results: results.array()
        })
    }

    const { email, fullName, password } = req.body;
    
    try {
        const existingUser = await prisma.User.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const newUser = await prisma.User.create({
            data: { email, fullName, password }
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            results: { email: newUser.email }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
 }
 

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
export async function login(req, res) {
    const results =  validationResult(req)
    if  (!results.isEmpty()) {
        res.json({
            success: false,
            message: 'vaidation error',
            results: results.array()
        })
    }
        const { email, password } = req.body;

    try {
        const prisma = getPrisma();

        const user = await prisma.User.findUnique({
            where: { email }
        });

        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'wrong email or password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successfully',
            results: { 
                email: user.email, 
                fullName: user.fullName }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
