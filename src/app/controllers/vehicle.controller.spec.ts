// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { VehicleController } from './vehicle.controller';

describe('VehicleController', () => {

  let controller: VehicleController;

  beforeEach(() => controller = createController(VehicleController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(VehicleController, 'foo'), 'GET');
      strictEqual(getPath(VehicleController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
