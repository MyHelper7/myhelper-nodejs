import Joi from 'joi';

class TemplateValidation {
  public getAll = {
    query: Joi.object().keys({
      type: Joi.string().optional(),
      pageSize: Joi.number().optional().default(25),
      nextPageToken: Joi.string().optional(),
    }),
  }

  public create = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.string().required(),
      content: Joi.string().required(),
      note: Joi.string().optional(),
    }),
  }
  
  public getById = {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }

  public update = {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().optional(),
      type: Joi.string().optional(),
      content: Joi.string().optional(),
      note: Joi.string().optional(),
    }),
  }
}

export const templateValidation = new TemplateValidation();
