import {Context, Get, HttpResponseOK, render} from '@foal/core';
import {Client} from "../entities";

export class ClientController {

    @Get('/')
    async indexClient(ctx: Context) {
        const clients = await Client.find({relations:['vehicles']})
        return await render('./templates/panel/clients_vehicles/client/index.html.twig',{
            clients: clients
        })
    }

    @Get('/show/:client.dni_nif')
    async showClient(ctx: Context){
        const client = await Client.findOne({dni_nif: ctx.request.params.dni_nif}, {relations:['vehicles']})
        return await render('./templates/panel/clients_vehicles/client/show.html.twig', {
            client: client
        })
    }


}
