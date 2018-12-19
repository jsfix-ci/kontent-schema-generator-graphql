# Kentico GraphQl schema generator
[![Build Status](https://api.travis-ci.org/Kentico/kentico-cloud-graphql-schema-generator.svg?branch=master)](https://travis-ci.org/Kentico/kentico-cloud-graphql-schema-generator)
[![npm version](https://badge.fury.io/js/kentico-cloud-graphql-schema-generator.svg)](https://www.npmjs.com/package/kentico-cloud-graphql-schema-generator)
[![npm](https://img.shields.io/npm/dt/kentico-cloud-graphql-schema-generator.svg)](https://www.npmjs.com/package/kentico-cloud-graphql-schema-generator)

[GraphQL schema](https://graphql.org/learn/schema/) generator used to generate schema based on specified project.

This schema could be used when creating [GraphQL](https://graphql.org) endpoint from [Kentico Cloud Delivery API REST endpoint](https://developer.kenticocloud.com/reference#delivery-api).

# Get started

## Prerequisites
* [Node](https://nodejs.org/en/download/) installed

## Installation
`npm i kentico-cloud-graphql-schema-generator -g`

## Generating schema with NPM script

Provide a [project ID](https://developer.kenticocloud.com/v1/reference) of your project. 

Write  type definition to the snadard output
* `kc-generate-gql-schema --projectId xxx`

Generate file with definition exported as a constant fo file `config.js`
* `kc-generate-gql-schema --projectId xxx --createModule --outputFile "config.js"`


## Configuration

* `projectId` - represents the Kentico Cloud Project Id from which schema will be generated
* `secureAccessKey` - Secure access key required to authenticate requests with enabled secure access in Kentico Cloud project
* `outputFile` - specifies output file name (possible with the path), if not specified - output is written to standard output
* `createModule` - output is defined as a constant and exported as a module (see [Example Output](#example-output))


# Development

1. Clone the repository
2. Run `npm install` to intall all rewuired dependencies
3. Run `npm run build` to build the solution


## Run

Run `node ./_commonjs/index.js --projectId xxx`

## Test
* Run `npm test` to run all tests

## Run watch mode
* Run `npm run watch` to run the watch mode

# Example output

<details>
<summary>Without module encapsulation (w/o `createModule`)</summary>

```
type SystemInfo {
  id: String!
  name: String!
  codename: String!
  language: String!
  type: String!
  lastModified: String!
}
interface ContentItem {
  system: SystemInfo!
}
type MultipleChoiceElementOption {
  name: String!
  codename: String
}
type TaxonomyTerm {
  name: String!
  codename: String
}
type Asset {
  name: String
  type: String
  size: Int
  description: String
  url: String,
}
type Link {
  codename: String
  itemID: String
  urlSlug: String
  type: String
}
type TextElement {
  type: String!
  name: String!
  value: String
}
type NumberElement {
  type: String!
  name: String!
  value: String
  number: Int
}
type DateTimeElement {
  type: String!
  name: String!
  value: String
  datetime: String
}
type MultipleChoiceElement {
  type: String!
  name: String!
  value: String
  options: [MultipleChoiceElementOption]
}
type UrlSlugElement {
  type: String!
  name: String!
  value: String
  data: String
}
type TaxonomyElement {
  type: String!
  name: String!
  value: String
  taxonomyGroup: String
  taxonomyTerms: [TaxonomyTerm]
}
type AssetElement {
  type: String!
  name: String!
  value: String
  assets: [Asset]
}
type RichTextElement {
  type: String!
  name: String!
  value: String
  linkedItemCodenames: [String]
  links: [Link]
}

type AboutUsContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  url_pattern: UrlSlugElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  facts: [ContentItem]
}

```

</details>

<details>
<summary>With module encapsulation</summary>

```
const TYPE_DEFINITION = `type SystemInfo {
  id: String!
  name: String!
  codename: String!
  language: String!
  type: String!
  lastModified: String!
}
interface ContentItem {
  system: SystemInfo!
}
type MultipleChoiceElementOption {
  name: String!
  codename: String
}
type TaxonomyTerm {
  name: String!
  codename: String
}
type Asset {
  name: String
  type: String
  size: Int
  description: String
  url: String,
}
type Link {
  codename: String
  itemID: String
  urlSlug: String
  type: String
}
type TextElement {
  type: String!
  name: String!
  value: String
}
type NumberElement {
  type: String!
  name: String!
  value: String
  number: Int
}
type DateTimeElement {
  type: String!
  name: String!
  value: String
  datetime: String
}
type MultipleChoiceElement {
  type: String!
  name: String!
  value: String
  options: [MultipleChoiceElementOption]
}
type UrlSlugElement {
  type: String!
  name: String!
  value: String
  data: String
}
type TaxonomyElement {
  type: String!
  name: String!
  value: String
  taxonomyGroup: String
  taxonomyTerms: [TaxonomyTerm]
}
type AssetElement {
  type: String!
  name: String!
  value: String
  assets: [Asset]
}
type RichTextElement {
  type: String!
  name: String!
  value: String
  linkedItemCodenames: [String]
  links: [Link]
}

type AboutUsContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  url_pattern: UrlSlugElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  facts: [ContentItem]
}`;

module.exports = {
  TYPE_DEFINITION
}
```

</details>

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/kentico-cloud-graphql-schema-generator?pixel)
