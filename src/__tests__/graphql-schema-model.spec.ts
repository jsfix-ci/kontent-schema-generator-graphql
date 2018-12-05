import { GraphQLSchemaModel } from '../graphql-schema-model';

describe('getFieldDefinitions ', () => {
  it('Return correct number of items', () => {
    const schemaModel = new GraphQLSchemaModel();
    const fieldSchemas = schemaModel.getFieldDefinitions();
    expect(fieldSchemas.length).toEqual(14);
  });
});
