import {Context, Get, HttpResponseOK, render} from '@foal/core';

export class RegisterController {

  @Get('/')
  async foo(ctx: Context) {
    await render ('./templates/panel/register/index.html.twig');
    return new HttpResponseOK();
  }

}
