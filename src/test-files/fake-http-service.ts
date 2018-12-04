import {
  IBaseResponse,
  IBaseResponseError,
  IHttpDeleteQueryCall,
  IHttpGetQueryCall,
  IHttpPostQueryCall,
  IHttpPutQueryCall,
  IHttpQueryOptions,
  IHttpService,
} from 'kentico-cloud-core';
import { Observable, of, throwError } from 'rxjs';

export class FakeHttpService implements IHttpService {

  public throwCloudError: boolean = false;
  public fakeResponseJson: any = undefined;
  public errorJson: any = undefined;

  constructor(config: {
    fakeResponseJson?: any,
    throwCloudError?: boolean,
    errorJson?: any,
  }) {
    Object.assign(this, config);
  }

  public get<TError extends any, TRawData extends any>(
    call: IHttpGetQueryCall<TError>,
    _?: IHttpQueryOptions,
  ): Observable<IBaseResponse<TRawData>> {

    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson,
        },
      };
      return throwError({
        mappedError: call.mapError(fakeError),
        originalError: fakeError,
      } as IBaseResponseError<TError>);
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined,
    } as IBaseResponse<TRawData>);
  }

  public post<TError extends any, TRawData extends any>(
    call: IHttpPostQueryCall<TError>,
    _?: IHttpQueryOptions,
  ): Observable<IBaseResponse<TRawData>> {

    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson,
        },
      };
      return throwError({
        mappedError: call.mapError(fakeError),
        originalError: fakeError,
      } as IBaseResponseError<TError>);
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined,
    } as IBaseResponse<TRawData>);
  }

  public put<TError extends any, TRawData extends any>(
    call: IHttpPutQueryCall<TError>,
    _?: IHttpQueryOptions,
  ): Observable<IBaseResponse<TRawData>> {

    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson,
        },
      };
      return throwError({
        mappedError: call.mapError(fakeError),
        originalError: fakeError,
      } as IBaseResponseError<TError>);
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined,
    } as IBaseResponse<TRawData>);
  }

  public delete<TError extends any, TRawData extends any>(
    call: IHttpDeleteQueryCall<TError>,
    _?: IHttpQueryOptions,
  ): Observable<IBaseResponse<TRawData>> {

    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson,
        },
      };
      return throwError({
        mappedError: call.mapError(fakeError),
        originalError: fakeError,
      } as IBaseResponseError<TError>);
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined,
    } as IBaseResponse<TRawData>);
  }
}
