import * as config from '../../../config.json';
import { name, version } from '../../../package.json';

describe('config tracking header', () => {
  it('has correct name', () => {
    expect(config.trackingHeader.header).toEqual('X-KC-SOURCE');
  });

  it('has correct value according to package name and package version', () => {

    const expectedHeaderValue = `${name};${version}`;
    expect(config.trackingHeader.value).toEqual(expectedHeaderValue);
  });
});