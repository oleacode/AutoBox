import {Context, Get, HttpResponseRedirect, Post, render} from '@foal/core';


export class ApiController {

  @Get('/')
  async index(ctx: Context) {
    return await render('./templates/panel/index.html.twig');
  }


}
