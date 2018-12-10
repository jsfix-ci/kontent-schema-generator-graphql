import * as fs from 'fs';
import { DeliveryClient } from 'kentico-cloud-delivery';
import { SchemaGenerator } from '../../schema-generator';
import * as fakeEmptyTypes from '../data/fakeEmptyTypes.json';
import * as fakeTypesComplex from '../data/fakeTypesComplex.json';
import { FakeHttpService } from '../fakes/fake-http-service';

describe('Constructor ', () => {
  it('fail when provide undefined .', () => {
    expect(() => new SchemaGenerator(undefined as any)).toThrowError();
  });
  it('fail when provide null.', () => {
    expect(() => new SchemaGenerator(null as any)).toThrowError();
  });
  it('success with fake client', () => {
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: new FakeHttpService({
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
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: new FakeHttpService({
        fakeResponseJson: fakeEmptyTypes,
        throwCloudError: false,
      }),
      projectId: 'testProjectId',
    }));
    const types = await generator.getSchema();
    const fakeEmptyTypesOutput = fs.readFileSync('./src/__tests__/data/fakeEmptyTypes.output.txt', 'utf8');
    expect(types).toEqual(fakeEmptyTypesOutput);
  });
});

describe('getSchema', () => {
  it('return correct schema', async () => {
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: new FakeHttpService({
        fakeResponseJson: fakeTypesComplex,
        throwCloudError: false,
      }),
      projectId: 'testProjectId',
    }));
    const types = await generator.getSchema();
    const fakeTypesComplexOutput = fs.readFileSync('./src/__tests__/data/fakeTypesComplex.output.txt', 'utf8');
    expect(types).toEqual(fakeTypesComplexOutput);
  });
});

describe('createModule', () => {
  const fakeEmptyTypesOutput = fs.readFileSync('./src/__tests__/data/fakeEmptyTypes.output.txt', 'utf8');
  const generator = new SchemaGenerator(new DeliveryClient({
    httpService: new FakeHttpService({
      fakeResponseJson: fakeEmptyTypes,
      throwCloudError: false,
    }),
    projectId: 'testProjectId',
  }));

  it('is used when is set', async () => {
    const expectedOutput = `export const TYPE_DEFINITION = \`${fakeEmptyTypesOutput}\`;`;
    generator.createModule(true);

    const output = await generator.getSchema();
    expect(output).toEqual(expectedOutput);
  });
});
