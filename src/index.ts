#!/usr/bin/env node
import { DeliveryClient } from 'kentico-cloud-delivery';
import { SchemaGenerator } from './schema-generator';

// tslint:disable-next-line:no-var-requires
const yargs = require('yargs');

const argv = yargs.argv;

const projectId: string = argv.projectId;
const secureAccessKey: string = argv.secureAccessKey;

if (!projectId) {
  throw Error(`Please provide project id using 'projectId' argument`);
}

const deliveryClient = new DeliveryClient({
  enableSecuredMode: secureAccessKey ? true : false,
  projectId,
  securedApiKey: secureAccessKey,
});

const generator = new SchemaGenerator(deliveryClient);

generator.startSchemaGenerator().then(() => {
  console.info('Generation finished');
});
