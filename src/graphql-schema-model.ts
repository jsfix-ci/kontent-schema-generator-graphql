import { ElementType } from '@kentico/kontent-delivery';

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
  public static customElementTypeName: string = 'CustomElement';

  public static linkedItemsElement: string = '[ContentItem]';

  public static elementTypeMapping: Map<string, string> = new Map([
    [
      ElementType.Text.toString(),
      GraphQLSchemaModel.textElementTypeName,
    ],
    [
      ElementType.Number.toString(),
      GraphQLSchemaModel.numberElementTypeName,
    ],
    [
      ElementType.DateTime.toString(),
      GraphQLSchemaModel.dateTimeElementTypeName,
    ],
    [
      ElementType.MultipleChoice.toString(),
      GraphQLSchemaModel.multipleChoiceElementTypeName,
    ],
    [
      ElementType.UrlSlug.toString(),
      GraphQLSchemaModel.urlSlugElementTypeName,
    ],
    [
      ElementType.Taxonomy.toString(),
      GraphQLSchemaModel.taxonomyElementTypeName,
    ],
    [
      ElementType.Asset.toString(),
      GraphQLSchemaModel.assetElementTypeName,
    ],
    [
      ElementType.ModularContent.toString(),
      GraphQLSchemaModel.linkedItemsElement,
    ],
    [
      ElementType.RichText.toString(),
      GraphQLSchemaModel.richTextElementTypeName,
    ],
    [
      ElementType.Custom.toString(),
      GraphQLSchemaModel.customElementTypeName,
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
  url: String
  width: Int
  height: Int
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
    [
      'richtext_image',
      `type RichTextImage {
  imageId: String!
  url: String!
  description: String
  width: Int
  height: Int
}`,
    ],
  ]);

  public static elementTypes: Map<string, string> = new Map([
    [
      ElementType.Text.toString(),
      `type ${GraphQLSchemaModel.textElementTypeName} {
  type: String!
  name: String!
  value: String
}`,
    ],
    [
      ElementType.Number.toString(),
      `type ${GraphQLSchemaModel.numberElementTypeName} {
  type: String!
  name: String!
  value: Int
}`,
    ],
    [
      ElementType.DateTime.toString(),
      `type ${GraphQLSchemaModel.dateTimeElementTypeName} {
  type: String!
  name: String!
  value: String
}`,
    ],
    [
      ElementType.MultipleChoice.toString(),
      `type ${GraphQLSchemaModel.multipleChoiceElementTypeName} {
  type: String!
  name: String!
  value: [MultipleChoiceElementOption]
}`,
    ],
    [
      ElementType.UrlSlug.toString(),
      `type ${GraphQLSchemaModel.urlSlugElementTypeName} {
  type: String!
  name: String!
  value: String
}`,
    ],
    [
      ElementType.Taxonomy.toString(),
      `type ${GraphQLSchemaModel.taxonomyElementTypeName} {
  type: String!
  name: String!
  value: [TaxonomyTerm]
  taxonomyGroup: String
}`,
    ],
    [
      ElementType.Asset.toString(),
      `type ${GraphQLSchemaModel.assetElementTypeName} {
  type: String!
  name: String!
  value: [Asset]
}`,
    ],
    [
      ElementType.RichText.toString(),
      `type ${GraphQLSchemaModel.richTextElementTypeName} {
  type: String!
  name: String!
  value: String
  linkedItemCodenames: [String]
  links: [Link]
  images: [RichTextImage]
  resolvedHtml: String
}`,
    ],
    [
      ElementType.Custom.toString(),
      `type ${GraphQLSchemaModel.customElementTypeName} {
  type: String!
  name: String!
  value: String
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
      .concat(Array.from(GraphQLSchemaModel.elementTypes.values()));
  }

}
