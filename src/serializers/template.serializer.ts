import { pick } from '../utils';
import { BaseSerializer } from './base';

export class TemplateSerializer implements BaseSerializer {
  public template: any;

  constructor(template: any) {
    this.template = template;
  }

  serialize() {
    return {
      ...pick(this.template, [
        'id',
        'name',
        'type',
        'content',
        'note',
      ]),
      createdAt: this.template.createdAt?.toDate()?.toString() || null,
      updatedAt: this.template.updatedAt?.toDate()?.toString() || null,
    };
  }
}
