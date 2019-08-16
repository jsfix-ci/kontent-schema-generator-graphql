#!/usr/bin/env node
import * as fs from 'fs';
import { DeliveryClient } from 'kentico-cloud-delivery';
import * as yargs from 'yargs';
import * as config from '../config.json';
import { SchemaGenerator } from './schema-generator';

const argv = yargs.argv;
const projectId: string = argv.projectId as string;
const secureAccessKey: string = argv.secureAccessKey as string;
const outputFile: string = argv.outputFile as string;
const createModule: boolean = argv.createModule as boolean;

if (!projectId) {
  throw Error('Please provide project id using \'projectId\' argument');
}

const deliveryClient = new DeliveryClient({
  globalQueryConfig: {
    customHeaders: [
      config.trackingHeader,
    ],
    useSecuredMode: secureAccessKey ? true : false,
  },
  projectId,
  secureApiKey: secureAccessKey,

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
