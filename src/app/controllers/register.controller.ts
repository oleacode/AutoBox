import {Context, Get, HttpResponseOK, render} from '@foal/core';
import {Register} from '../entities';

export class RegisterController {

  @Get('/')
  async foo(ctx: Context) {
    const registers = await  Register.find();
    return await render ('./templates/panel/register/index.html.twig',{
      registers: registers
    });
  }

}
