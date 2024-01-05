import { errorHandler } from '../middlewares';
import { ITemplate, Template } from '../models';
import { RecordList } from '../types';
import { FirebaseError, RecordNotFoundError } from '../utils';

class TemplateDAL {
  get instance() {
    return Template;
  }

  public async create(payload: ITemplate): Promise<Template> {
    try {
      const template = await Template.create(payload);
      if (!template) throw new FirebaseError('Template not created');
      return template;
    } catch (error: any) {
      const errorObj = errorHandler.handleDBError(error);
      throw new errorObj.errorClass(errorObj.message || 'Template not created', error);
    }
  }

  public async getAll({ type, pageSize = 25, nextPageToken = '' }): Promise<RecordList<Template>> {
    const result = await Template.getByFields({
      ...(type ? { type: { value: type, operator: '==' } } : null)
    }, pageSize, nextPageToken);
    return { records: result.records, nextPageToken: result.nextPageToken };
  }

  public async getById(id: string): Promise<Template> {
    const template = await Template.getById(id);
    if (!template) throw new RecordNotFoundError('Template not found');
    return template;
  }

  public async update(id: string, payload: ITemplate): Promise<boolean> {
    const template = await this.getById(id);
    await template.update({
      ...(payload?.name ? { name: payload.name} : null),
      ...(payload?.type ? { type: payload.type} : null),
      ...(payload?.content ? { name: payload.content} : null),
      ...(payload?.note ? { name: payload.note} : null),
    });
    return true;
  }

  public async delete(id: string): Promise<boolean> {
    const template = await this.getById(id);
    await template.delete();
    return true;
  }
}

export const templateDAL = new TemplateDAL();
