import express from 'express';
import { catchAsync } from '../../utils';
import { validate } from '../../middlewares';

import { templateValidation } from '../../validations';
import { templateController } from '../../controllers';

export const templateRouter = express.Router();

templateRouter.route('/')
  .get(validate(templateValidation.getAll), catchAsync(templateController.getAll))
  .post(validate(templateValidation.create), catchAsync(templateController.create));

templateRouter.route('/:id')
  .get(validate(templateValidation.getById), catchAsync(templateController.getById))
  .put(validate(templateValidation.update), catchAsync(templateController.update))
  .delete(validate(templateValidation.getById), catchAsync(templateController.delete))

/**
 * @swagger
 * /v1/admin/templates:
 *   get:
 *     summary: Get list of template
 *     description: Get list of template
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type of template
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: number
 *         description: Number of records
 *       - in: query
 *         name: next_page_token
 *         schema:
 *           type: string
 *         description: Page Token
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Template'
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 * 
 *   post:
 *     summary: Create a template
 *     description: Create a template
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *               note:
 *                 type: string
 *             example:
 *               name: "sample"
 *               type: "sample_type"
 *               content: "<h1>Hello World</h1>"
 *               note: "Test note"
 *     responses:
 *       "201":
 *         description: CREATED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
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
 * /v1/admin/templates/{id}:
 *   get:
 *     summary: Get detail of template
 *     description: Get detail of template
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Template id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     summary: Update Template Detail
 *     description: Update Template Detail
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Template id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *               note:
 *                 type: string
 *             example:
 *               name: "sample"
 *               type: "sample_type"
 *               content: "<h1>Hello World</h1>"
 *               note: "Test note"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       "400":
 *         $ref: '#/components/responses/BadRequestError'
 *       "412":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete Template
 *     description: Delete Template
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Template id
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
