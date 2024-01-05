import express from 'express';
import { catchAsync } from '../../utils';
import { accountController } from '../../controllers';
import { auth, validate } from '../../middlewares';
import { accountValidation } from '../../validations';

export const accountRouter = express.Router();

accountRouter.route('/')
  .get(auth(), catchAsync(accountController.getDetail))
  .put(auth(), validate(accountValidation.updateAccount), catchAsync(accountController.updateAccount))
  .delete(auth(), catchAsync(accountController.deleteAccount));

accountRouter.route('/password')
  .put(auth(), validate(accountValidation.updatePassword), catchAsync(accountController.updatePassword))

accountRouter.route('/deactivate')
  .put(auth(), catchAsync(accountController.deactivateAccount))


/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account
 */

/**
 * @swagger
 * /v1/account:
 *   get:
 *     summary: Get detail of user account
 *     description: Get detail of user account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     summary: Update User Detail
 *     description: Update User Detail
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               photo:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *             example:
 *               first_name: "abcd"
 *               last_name: "xyz"
 *               photo: "abcd"
 *               phone_number: "+911234567890"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete User Account
 *     description: Delete User Account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
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
 * /v1/account/deactivate:
 *   put:
 *     summary: Deactivate User Account
 *     description: Deactivate User Account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
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
 * /v1/account/password:
 *   put:
 *     summary: Update User Password
 *     description: Update User Password
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *             example:
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
 */