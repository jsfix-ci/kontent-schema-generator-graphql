import { ContentType, DeliveryClient} from 'kentico-cloud-delivery';
import { GraphQLSchemaModel } from './graphql-schema-model';

export class SchemaGenerator {
    private readonly deliveryClient: DeliveryClient;
    private encapsulateToModule: boolean = false;

    constructor(deliveryClient: DeliveryClient) {
        if (!deliveryClient) {
            throw Error('Provide DeliveryClient');
        }
        this.deliveryClient = deliveryClient;
    }

    public async getSchema(): Promise<string> {
        const schemaModel = new GraphQLSchemaModel();
        const fieldSchemas = schemaModel.getFieldDefinitions();

        const contentTypes: ContentType[] = await this.loadContentTypes();
        const contentTypesSchemas = this.transformToSchemas(contentTypes);

        let result = fieldSchemas.concat(contentTypesSchemas).join('\n');
        if (this.encapsulateToModule) {
            result = this.wrapByModule(result);
        }
        return result;
    }

    public createModule(value: boolean): SchemaGenerator {
        this.encapsulateToModule = value;
        return this;
    }

    private wrapByModule(input: string): string {
        return `const TYPE_DEFINITION = \`${input}\`;

module.exports = {
  TYPE_DEFINITION
}`;
    }

    private transformToSchemas(contentTypes: ContentType[]): string[] {
        return contentTypes.map((contentType: ContentType) => {

            const elements = contentType.elements.map((contentElement) => {
                if (!GraphQLSchemaModel.elementTypeMapping.get(contentElement.type)) {
                    throw Error(`Unknown content type element ${contentElement.type}`);
                }

                const fieldType = GraphQLSchemaModel.elementTypeMapping.get(contentElement.type);
                return `${contentElement.codename}: ${fieldType}`;
            });

            const typename = this.snakeToPascal(contentType.system.codename) + 'ContentType';

            return `
type ${typename} implements ${GraphQLSchemaModel.contentItemInterfaceName} {
  system: ${GraphQLSchemaModel.systemTypeName}!
  ${elements.join('\n' + '  ')}
}`;
        });
    }

    private async loadContentTypes(): Promise<ContentType[]> {
        return await this.deliveryClient
            .types()
            .toPromise()
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
