import * as fs from 'fs';
import { TestHttpService  } from 'kentico-cloud-core';
import { DeliveryClient } from 'kentico-cloud-delivery';
import { SchemaGenerator } from '../../schema-generator';
import * as fakeEmptyTypes from '../data/fakeEmptyTypes.json';
import * as fakeTypesComplex from '../data/fakeTypesComplex.json';

describe('Constructor ', () => {
  it('fail when provide undefined .', () => {
    expect(() => new SchemaGenerator(undefined as any)).toThrowError();
  });
  it('fail when provide null.', () => {
    expect(() => new SchemaGenerator(null as any)).toThrowError();
  });
  it('success with fake client', () => {
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: new TestHttpService({
        fakeResponseJson: fakeTypesComplex,
        throwCloudError: false,
      }),
      projectId: 'testProjectId',
    }));
    expect(generator).toBeTruthy();
  });
});

describe('getSchema', () => {
  it('return correct fields for no types', async () => {
    const testHttpService = new TestHttpService({
      fakeResponseJson: fakeEmptyTypes,
      throwCloudError: false,
    });
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: testHttpService,
      projectId: 'testProjectId',
    }));
    const types = await generator.getSchema();
    const fakeEmptyTypesOutput = fs.readFileSync('./src/__tests__/data/fakeEmptyTypes.output.txt', 'utf8');
    expect(types).toEqual(fakeEmptyTypesOutput);
  });
});

describe('getSchema', () => {
  it('return correct schema', async () => {
    const testHttpService = new TestHttpService({
      fakeResponseJson: fakeTypesComplex,
      throwCloudError: false,
    });
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: testHttpService,
      projectId: 'testProjectId',
    }));
    const types = await generator.getSchema();
    const fakeTypesComplexOutput = fs.readFileSync('./src/__tests__/data/fakeTypesComplex.output.txt', 'utf8');
    expect(types).toEqual(fakeTypesComplexOutput);
  });
});

describe('createModule', () => {
  const fakeEmptyTypesOutput = fs.readFileSync('./src/__tests__/data/fakeEmptyTypes.output.txt', 'utf8');
  const testHttpService = new TestHttpService({
    fakeResponseJson: fakeEmptyTypes,
    throwCloudError: false,
  });
  const generator = new SchemaGenerator(new DeliveryClient({
    httpService: testHttpService,
    projectId: 'testProjectId',
  }));

  it('is used when is set', async () => {
    const expectedOutput = `const TYPE_DEFINITION = \`${fakeEmptyTypesOutput}\`;

module.exports = {
  TYPE_DEFINITION
}`;
    generator.createModule(true);

    const output = await generator.getSchema();
    expect(output).toEqual(expectedOutput);
  });
});
