import { DeliveryClient } from '@kentico/kontent-delivery';
import { SchemaGenerator } from '../../schema-generator';

describe('getSchema', () => {
  it('return correct schema from shared project', async () => {
    const generator = new SchemaGenerator(new DeliveryClient({
      projectId: '975bf280-fd91-488c-994c-2f04416e5ee3',
    }));
    const types = await generator.getSchema();
    expect(types).toMatchSnapshot();
  });
});
