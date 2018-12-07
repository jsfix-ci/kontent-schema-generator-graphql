import { FieldType } from 'kentico-cloud-delivery';

export class GraphQLSchemaModel {

  public static systemTypeName: string = 'SystemInfo';
  public static contentItemInterfaceName: string = 'ContentItem';

  public static textElementTypeName: string = 'TextElement';
  public static numberElementTypeName: string = 'NumberElement';
  public static dateTimeElementTypeName: string = 'DateTimeElement';
  public static multipleChoiceElementTypeName: string = 'MultipleChoiceElement';
  public static urlSlugElementTypeName: string = 'UrlSlugElement';
  public static taxonomyElementTypeName: string = 'TaxonomyElement';
  public static assetElementTypeName: string = 'AssetElement';
  public static richTextElementTypeName: string = 'RichTextElement';

  public static linkedItemsElement: string = '[ContentItem]';

  public static elementTypeMapping: Map<string, string> = new Map([
    [
      FieldType.Text.toString(),
      GraphQLSchemaModel.textElementTypeName,
    ],
    [
      FieldType.Number.toString(),
      GraphQLSchemaModel.numberElementTypeName,
    ],
    [
      FieldType.DateTime.toString(),
      GraphQLSchemaModel.dateTimeElementTypeName,
    ],
    [
      FieldType.MultipleChoice.toString(),
      GraphQLSchemaModel.multipleChoiceElementTypeName,
    ],
    [
      FieldType.UrlSlug.toString(),
      GraphQLSchemaModel.urlSlugElementTypeName,
    ],
    [
      FieldType.Taxonomy.toString(),
      GraphQLSchemaModel.taxonomyElementTypeName,
    ],
    [
      FieldType.Asset.toString(),
      GraphQLSchemaModel.assetElementTypeName,
    ],
    [
      FieldType.ModularContent.toString(),
      GraphQLSchemaModel.linkedItemsElement,
    ],
    [
      FieldType.RichText.toString(),
      GraphQLSchemaModel.richTextElementTypeName,
    ],
  ]);

  public static systemType: string =
    `type ${GraphQLSchemaModel.systemTypeName} {
  id: String!
  name: String!
  codename: String!
  language: String!
  type: String!
  lastModified: String!
}`;

  public static interfaces: Map<string, string> = new Map([
    [
      '',
      `interface ${GraphQLSchemaModel.contentItemInterfaceName} {
  system: SystemInfo!
}`,
    ],
  ]);

  public static helperTypes: Map<string, string> = new Map([
    [
      'multiple_choice_option',
      `type MultipleChoiceElementOption {
  name: String!
  codename: String
}`,
    ],
    [
      'taxonomy_term',
      `type TaxonomyTerm {
  name: String!
  codename: String
}`,
    ],
    [
      'asset',
      `type Asset {
  name: String
  type: String
  size: Int
  description: String
  url: String,
}`,
    ],
    [
      'link',
      `type Link {
  codename: String
  itemID: String
  urlSlug: String
  type: String
}`,
    ],
  ]);

  public static fieldTypes: Map<string, string> = new Map([
    [
      FieldType.Text.toString(),
      `type ${GraphQLSchemaModel.textElementTypeName} {
  type: String!
  name: String!
  value: String
}`,
    ],
    [
      FieldType.Number.toString(),
      `type ${GraphQLSchemaModel.numberElementTypeName} {
  type: String!
  name: String!
  value: String
  number: Int
}`,
    ],
    [
      FieldType.DateTime.toString(),
      `type ${GraphQLSchemaModel.dateTimeElementTypeName} {
  type: String!
  name: String!
  value: String
  datetime: String
}`,
    ],
    [
      FieldType.MultipleChoice.toString(),
      `type ${GraphQLSchemaModel.multipleChoiceElementTypeName} {
  type: String!
  name: String!
  value: String
  options: [MultipleChoiceElementOption]
}`,
    ],
    [
      FieldType.UrlSlug.toString(),
      `type ${GraphQLSchemaModel.urlSlugElementTypeName} {
  type: String!
  name: String!
  value: String
  data: String
}`,
    ],
    [
      FieldType.Taxonomy.toString(),
      `type ${GraphQLSchemaModel.taxonomyElementTypeName} {
  type: String!
  name: String!
  value: String
  taxonomyGroup: String
  taxonomyTerms: [TaxonomyTerm]
}`,
    ],
    [
      FieldType.Asset.toString(),
      `type ${GraphQLSchemaModel.assetElementTypeName} {
  type: String!
  name: String!
  value: String
  assets: [Asset]
}`,
    ],
    [
      FieldType.RichText.toString(),
      `type ${GraphQLSchemaModel.richTextElementTypeName} {
  type: String!
  name: String!
  value: String
  linkedItemCodenames: [String]
  links: [Link]
}`,
    ],
  ]);

  /**
   * Create all field definition including depending types.
   * @returns {string[]}
   */
  public getFieldDefinitions(): string[] {
    return [GraphQLSchemaModel.systemType]
      .concat(Array.from(GraphQLSchemaModel.interfaces.values()))
      .concat(Array.from(GraphQLSchemaModel.helperTypes.values()))
      .concat(Array.from(GraphQLSchemaModel.fieldTypes.values()));
  }

}
