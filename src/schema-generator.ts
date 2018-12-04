import { ContentType, DeliveryClient } from 'kentico-cloud-delivery';

export class SchemaGenerator {
    private readonly deliveryClient: DeliveryClient;

    constructor(deliveryClient: DeliveryClient) {
        if (!deliveryClient) {
            throw Error('Provide DeliveryClient');
        }
        this.deliveryClient = deliveryClient;
    }

    public async startSchemaGenerator(): Promise<void> {
        console.info('Generator started.');

        const contentTypes: ContentType[] = await this.loadContentTypes();
        console.error(`TODO: Implement generation for:
            ${JSON.stringify(contentTypes.map((type) => type.system.codename))}`);
    }

    private async loadContentTypes(): Promise<ContentType[]> {
        return await this.deliveryClient
            .types()
            .getPromise()
            .then(({ types }) => {
                console.info(`${types.length} ${types.length === 1 ? 'type was' : 'types were'} loaded.`);
                return types;
            })
            .catch((error) => {
                console.error('Loading failed with error:');
                console.error(error);
                throw Error(error);
            });
    }
}
