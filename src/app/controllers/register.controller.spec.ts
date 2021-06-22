// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { RegisterController } from './register.controller';

describe('RegisterController', () => {

  let controller: RegisterController;

  beforeEach(() => controller = createController(RegisterController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(RegisterController, 'foo'), 'GET');
      strictEqual(getPath(RegisterController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
