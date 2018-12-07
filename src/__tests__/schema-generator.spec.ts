import * as fs from 'fs';
import { DeliveryClient } from 'kentico-cloud-delivery';
import { SchemaGenerator } from '../schema-generator';
import * as fakeEmptyTypes from './data/fakeEmptyTypes.json';
import * as fakeTypesComplex from './data/fakeTypesComplex.json';
import { FakeHttpService } from './fake-http-service';

describe('Constructor ', () => {
  it('Fail when provide undefined .', () => {
    expect(() => new SchemaGenerator(undefined as any)).toThrowError();
  });
  it('Fail when provide null.', () => {
    expect(() => new SchemaGenerator(null as any)).toThrowError();
  });
  it('Success with fake client', () => {
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
  it('Return correct fields for not types', async () => {
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: new FakeHttpService({
        fakeResponseJson: fakeEmptyTypes,
        throwCloudError: false,
      }),
      projectId: 'testProjectId',
    }));
    const types = await generator.getSchema();
    const fakeTypesComplexOutput = fs.readFileSync('./src/__tests__/data/fakeEmptyTypes.output.txt', 'utf8');
    expect(types).toEqual(fakeTypesComplexOutput);
  });
});

describe('getSchema', () => {
  it('Return correct schema', async () => {
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
