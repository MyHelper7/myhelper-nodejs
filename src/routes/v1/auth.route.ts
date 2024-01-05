import express from 'express';
import { catchAsync } from '../../utils';
import { validate } from '../../middlewares';

import { authValidation } from '../../validations';
import { authController } from '../../controllers';

export const authRouter = express.Router();

authRouter.post('/register', validate(authValidation.register), catchAsync(authController.register));
authRouter.post('/login', validate(authValidation.login), catchAsync(authController.login));
authRouter.post('/forgot-password', validate(authValidation.forgotPassword), catchAsync(authController.forgotPassword));
authRouter.post('/reset-password', validate(authValidation.resetPassword), catchAsync(authController.resetPassword));

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Create a user
 *     description: Create a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: email
 *               password:
 *                 type: string
 *             example:
 *               first_name: "abcd"
 *               last_name: "xyz"
 *               email: "abcd@xyz.com"
 *               password: "abcd1234"
 *     responses:
 *       "201":
 *         description: CREATED
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: email
 *               password:
 *                 type: string
 *             example:
 *               email: "abcd@xyz.com"
 *               password: "abcd1234"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                access_token:
 *                  type: boolean
 *                refresh_token:
 *                  type: boolean
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /v1/auth/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     description: Forgot Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: email
 *             example:
 *               email: "abcd@xyz.com"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /v1/auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     description: Reset Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reset_id
 *               - new_password
 *               - confirm_password
 *             properties:
 *               reset_id:
 *                 type: string
 *               new_password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *             example:
 *               reset_id: "xyz1234" 
 *               new_password: "abcd1234"
 *               confirm_password: "abcd1234"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 */
