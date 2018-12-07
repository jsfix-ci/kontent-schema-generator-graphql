import { ContentType, DeliveryClient, Element } from 'kentico-cloud-delivery';
import { GraphQLSchemaModel } from './graphql-schema-model';

export class SchemaGenerator {
    private readonly deliveryClient: DeliveryClient;

    constructor(deliveryClient: DeliveryClient) {
        if (!deliveryClient) {
            throw Error('Provide DeliveryClient');
        }
        this.deliveryClient = deliveryClient;
    }

    public async getSchema(): Promise<string> {
        console.info('Generator started.');

        const schemaModel = new GraphQLSchemaModel();
        const fieldSchemas = schemaModel.getFieldDefinitions();
        console.info('Field definitions loaded.');

        const contentTypes: ContentType[] = await this.loadContentTypes();
        console.info(`${contentTypes.length} ${contentTypes.length === 1 ? 'type was' : 'types were'} loaded.`);

        const contentTypesSchemas = this.transformToSchemas(contentTypes);
        console.info(`${contentTypes.length} ${contentTypes.length === 1 ? 'type was' : 'types were'} processed.`);

        return fieldSchemas.concat(contentTypesSchemas).join('\n');
    }

    private transformToSchemas(contentTypes: ContentType[]): string[] {
        return contentTypes.map((contentType: ContentType) => {

            const elements = contentType.elements.map((contentElement: Element) => {
                if (!GraphQLSchemaModel.elementTypeMapping.get(contentElement.type)) {
                    throw Error(`Unknown content type element ${contentElement.ty}`);
                }
                // TODO cover modular content (not a ModularContentField, but [ContentItem] + check assets + richtext)
                const fieldType = GraphQLSchemaModel.elementTypeMapping.get(contentElement.type);
                return `${contentElement.codename}: ${fieldType}`;
            });

            const typename = this.snakeToPascal(contentType.system.codename) + 'ContentType';
            return `
type ${typename} implements ${GraphQLSchemaModel.contentItemInterfaceName} {
  system: ${GraphQLSchemaModel.systemTypeName}!
  ${elements.join('\n  ')}
}`;
        });
    }

    private async loadContentTypes(): Promise<ContentType[]> {
        return await this.deliveryClient
            .types()
            .getPromise()
            .then(({ types }) => {
                return types;
            })
            .catch((error) => {
                console.error('Loading failed with error:');
                console.error(error);
                throw Error(error);
            });
    }

    private snakeToPascal(input: string) {
        return input.split('_')
        .map((str) => this.upperFirst(str))
        .join('');
    }

    private upperFirst(input: string) {
        return input.slice(0, 1).toUpperCase() + input.slice(1, input.length);
    }
}
