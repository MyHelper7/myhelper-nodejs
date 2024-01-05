import { templateDAL } from '../dal';
import { ITemplate, Template } from '../models';
import { RecordList } from '../types';

class TemplateService {
  public async create(payload: ITemplate): Promise<Template> {
    return templateDAL.create({
      name: payload.name,
      content: payload.content,
      type: payload.type,
    });
  }

  public async getAll({ type, pageSize, nextPageToken }): Promise<RecordList<Template>> {
    const data = await templateDAL.getAll({ type, pageSize, nextPageToken });
    return data;
  }

  public async getById(id: string): Promise<Template> {
    return templateDAL.getById(id);
  }

  public async update(id: string, payload: ITemplate): Promise<Template> {
    await templateDAL.update(id, payload);
    return templateDAL.getById(id);
  }

  public async delete(id: string): Promise<boolean> {
    return templateDAL.delete(id);
  }
}

export const templateService = new TemplateService();
