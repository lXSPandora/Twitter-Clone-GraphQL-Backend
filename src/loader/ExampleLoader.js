// @flow

import DataLoader from 'dataloader';
import ConnectionFromMongoCursor from '../connection/ConnectionFromMongoCursor';
import ExampleModel from '../model/Example';
import mongooseLoader from './mongooseLoader';

type ExampleType = {
  id: string,
  _id: string,
  exampleField: string,
}

export default class Example {
  id: string;
  _id: string;
  exampleField: string;

  static getLoader = () => new DataLoader(ids => mongooseLoader(ExampleModel, ids));

  constructor(data: ExampleType) {
    this.id = data.id;
    this._id = data._id;
    this.exampleField = data.exampleField;
  }

  static viewerCanSee(viewer, data) {
    // TODO: handle security

    return true;
  }

  static async load({ user: viewer, dataloaders }, id) {
    if (!id) {
      return null;
    }

    const data = await dataloaders.ExampleLoader.load(id.toString());

    return Example.viewerCanSee(viewer, data) ? new Example(data) : null;
  }

  static clearCache({ dataloaders }, id) {
    return dataloaders.ExampleLoader.clear(id.toString());
  }

  static async loadExamples(context, args) {
    // TODO: specify conditions
    const examples = ExampleModel.find({});

    return ConnectionFromMongoCursor.connectionFromMongoCursor(
      context, examples, args, Example.load,
    );
  }
}
