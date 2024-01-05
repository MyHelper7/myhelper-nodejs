import { IRequest, IResponse } from '../types';
import { pick, successResponse } from '../utils';
import { HTTP_STATUS } from '../constants';
import { templateService } from '../services';
import { TemplateSerializer } from '../serializers';

class TemplateController {
  public create = async (req: IRequest, res: IResponse) => {
    const payload = pick(req.body, ['name', 'content', 'type']);

    const result = await templateService.create(payload);

    const data = new TemplateSerializer(result).serialize();
    return successResponse(req, res, data, { statusCode: HTTP_STATUS.CREATED});
  };

  
  public getAll = async (req: IRequest, res: IResponse) => {
    const { type, pageSize, nextPageToken } = req.query;

    const result = await templateService.getAll({ type, pageSize, nextPageToken });

    const data = {
      records: result?.records?.map((template) => new TemplateSerializer(template).serialize()),
      nextPageToken: result.nextPageToken,
    };
    return successResponse(req, res, data);
  };

  public getById = async (req: IRequest, res: IResponse) => {
    const { id } = req.params;

    const result = await templateService.getById(id);

    const data = new TemplateSerializer(result).serialize();
    return successResponse(req, res, data);
  };

  public update = async (req: IRequest, res: IResponse) => {
    const { id } = req.params;
    const payload = pick(req.body, ['name', 'content', 'type', 'note']);

    const result = await templateService.update(id, payload);

    const data = new TemplateSerializer(result).serialize();
    return successResponse(req, res, data);
  };

  public delete = async (req: IRequest, res: IResponse) => {
    const { id } = req.params;

    await templateService.delete(id);

    return successResponse(req, res, { status: true });
  };
}

export const templateController = new TemplateController();
