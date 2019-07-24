#!/usr/bin/env node
import * as fs from 'fs';
import { DeliveryClient } from 'kentico-cloud-delivery';
import * as yargs from 'yargs';
import { SchemaGenerator } from './schema-generator';

const argv = yargs.argv;
const projectId: string = argv.projectId;
const secureAccessKey: string = argv.secureAccessKey;
const outputFile: string = argv.outputFile;
const createModule: boolean = argv.createModule;

if (!projectId) {
  throw Error('Please provide project id using \'projectId\' argument');
}

const deliveryClient = new DeliveryClient({
  projectId,
  secureMode: {
    isEnabledGlobally: secureAccessKey ? true : false,
    secureApiKey: secureAccessKey,
  },
});

const generator = new SchemaGenerator(deliveryClient);
generator.createModule(createModule);

generator.getSchema()
  .then((result) => {
    if (outputFile) {
      fs.writeFile(outputFile, result, (err) => {
        if (err) {
          console.error(`Error while writing schema to file: ${outputFile}`);
          throw err;
        }
      });
    } else {
      console.log(result);
    }
  });
