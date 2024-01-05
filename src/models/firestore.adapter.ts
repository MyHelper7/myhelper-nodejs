import { firebaseAdmin } from '../config';
import { RecordList } from '../types';

export type Operator = '==' | '<' | '<=' | '>' | '>=';

export interface DatabaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class FirestoreDB<T extends DatabaseEntity> {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(collectionName: string) {
    this.collection = firebaseAdmin.firestore().collection(collectionName);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.getByFields = this.getByFields.bind(this);
  }

  async create(data: Partial<T>): Promise<string> {
    const docRef = await this.collection.add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.collection.doc(id).set({ ...data, updatedAt: new Date() }, { merge: true });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  async getById(id: string): Promise<T | null> {
    const snapshot = await this.collection.doc(id).get();
    return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } as T : null;
  }

  async getByFields(fields?: { [field: string]: { value: any; operator: Operator } }, pageSize?: number, pageToken?: string,)
  : Promise<RecordList<T>> {
    let query: FirebaseFirestore.Query = this.collection;

    fields && Object.entries(fields).forEach(([field, { value, operator }]) => {
      query = query.where(field, operator, value);
    });

    query = query.orderBy(firebaseAdmin.firestore.FieldPath.documentId());

    pageToken && (query = query.startAfter(pageToken));
    pageSize && (query = query.limit(pageSize));

    const querySnapshot = await query.get();
    const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));

    const nextPageToken = querySnapshot.docs.length === pageSize ? querySnapshot.docs[pageSize - 1].id : undefined;

    return { records, nextPageToken };
  }
}

export abstract class FirestoreModel<T extends DatabaseEntity> {
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  protected db: FirestoreDB<T>;

  constructor(private entityName: string) {
    this.db = new FirestoreDB<T>(entityName);
  }

  async save(): Promise<void> {
    if (!this.id) {
      const dataToSave: Partial<T> = this.getDataToSave();

      const id = await this.db.create(dataToSave);
      this.id = id;
    } else {
      await this.update();
    }
  }

  async update(data?: Partial<T>): Promise<void> {
    if (!this.id) return;

    Object.assign(this, data);

    const dataToUpdate: Partial<T> = this.getDataToSave();

    await this.db.update(this.id, dataToUpdate);
  }

  async delete(): Promise<void> {
    if (!this.id) return;

    await this.db.delete(this.id);
  }

  private getDataToSave(): Partial<T> {
    const dataToSave: Partial<T> = {};

    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key) && key !== 'id' && key !== 'db' && this[key] !== undefined) {
        (dataToSave as Record<string, unknown>)[key] = this[key];
      }
    }

    return dataToSave;
  }

  static async new<T extends DatabaseEntity>(
    this: { new (): FirestoreModel<T> },
    data: T
  ): Promise<FirestoreModel<T>> {
    const instance = new this();
    await instance.initialize(data);
    return instance;
  }

  private async initialize(data: T): Promise<void> {
    Object.assign(this, data);
  }

  static async getById<T extends DatabaseEntity, M extends FirestoreModel<T>>(
    this: {
      getById: any; new (): M 
    },
    id: string
  ): Promise<M | null> {
    const instance = new this();
    if (instance.db) {
      const result = await instance.db.getById(id);
      if (result) {
        await instance.initialize(result);
        return instance;
      }
    }
    return null;
  }

  static async create<T extends DatabaseEntity, M extends FirestoreModel<T>>(
    this: {
      getById: any; new (): M 
    },
    data: T
  ): Promise<M | null> {
    const instance = new this();
    const id = await instance.db.create(data);
    const newInstance = await this.getById(id);
    if (newInstance) {
      await newInstance.initialize(data);
      return newInstance as M;
    }
    return null;
  }

  static async getByFields<T extends DatabaseEntity, M extends FirestoreModel<T>>(
    this: { new (): M },
    fields?: { [field: string]: { value: any; operator: Operator } },
    pageSize?: number,
    pageToken?: string,
  ): Promise<RecordList<M>> {
    const instances: M[] = [];
    const { records, nextPageToken } = await new this().db.getByFields(fields, pageSize, pageToken);

    for (const record of records) {
      const instance = new this();
      await instance.initialize(record);
      instances.push(instance);
    }

    return { records: instances, nextPageToken };
  }
}
