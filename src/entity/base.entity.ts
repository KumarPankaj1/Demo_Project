export default class Base<T> {
  readonly model: any;
  constructor(model: any) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  addValue = async (payload: any): Promise<any> => {
    try {
      const newDoc = await this.getModel().create(payload);
      return newDoc;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  find = async (filter: any): Promise<any> => {
    try {
      const doc = await this.getModel().findOne(filter);
      return doc;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  findAll = async (): Promise<any> => {
    try {
      const docs = await this.getModel().findOne({});
      return docs;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  update = async (filter: any, update: any): Promise<any> => {
    try {
      const doc = await this.getModel().findOneAndUpdate(filter, update, {
        new: true,
      });
      return doc;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  delete = async (filter: any): Promise<any> => {
    try {
      const doc = await this.getModel().findOneAndDelete({ filter });
      return doc;
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
