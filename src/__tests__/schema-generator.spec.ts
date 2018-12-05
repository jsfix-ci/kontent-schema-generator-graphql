import { DeliveryClient } from 'kentico-cloud-delivery';
import { SchemaGenerator } from '../schema-generator';
import { FakeHttpService } from '../test-files/fake-http-service';
import * as fakeTypesComplex from './data/fakeTypesComplex.json';

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
  it('Return correct schema', async () => {
    const generator = new SchemaGenerator(new DeliveryClient({
      httpService: new FakeHttpService({
        fakeResponseJson: fakeTypesComplex,
        throwCloudError: false,
      }),
      projectId: 'testProjectId',
    }));
    const types = await generator.getSchema();
    expect(types).toBeTruthy();
  });
});
