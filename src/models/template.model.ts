import { DatabaseEntity, FirestoreModel } from './firestore.adapter';


export interface ITemplate extends DatabaseEntity {
  name: string;
  type: string;
  content?: string;
  note?: string;
}

export class Template extends FirestoreModel<ITemplate>  {
  public name!: string;
  public type!: string;
  public content?: string;
  public note?: string;

  constructor() {
    super('templates');
  }
}
