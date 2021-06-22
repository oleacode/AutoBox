import {Context, Get, HttpResponseOK, HttpResponseRedirect, Post, render} from '@foal/core';
import {Client, Vehicle} from "../entities";

export class ClientController {

    @Get('/')
    async indexClient(ctx: Context) {
        const clients = await Client.find({relations:['vehicles']})
        return await render('./templates/panel/clients_vehicles/client/index.html.twig',{
            clients: clients
        })
    }

    @Get('/show/:dni_nif')
    async show(ctx: Context){
        const client = await Client.findOne({dni_nif: ctx.request.params.dni_nif})
        return await render('./templates/panel/clients_vehicles/client/show.html.twig', {
            client: client
        })
    }


    @Get('/new')
    async newGet(ctx: Context){
        return await render('./templates/panel/clients_vehicles/client/new.html.twig')
    }
    @Post('/new')
    async newPost(ctx: Context){
        const client          = new Client();
        client.name           = ctx.request.body.name;
        client.surname        = ctx.request.body.surname;
        client.dni_nif        = ctx.request.body.dni_nif;
        client.email          = ctx.request.body.email;
        client.phone_number1  = ctx.request.body.phone_number1;
        client.phone_number2  = ctx.request.body.phone_number2;
        client.address        = ctx.request.body.address;
        console.log(client)
        await client.save();
        return new HttpResponseRedirect('/client');
    }

    @Get('/edit/:dni_nif')
    async editGet(ctx: Context){
        const client = await Client.findOne({dni_nif:ctx.request.params.dni_nif},{relations:['vehicles']});
        const vehicles = await Vehicle.find();
        return await render('./templates/panel/clients_vehicles/client/edit.html.twig', {
            client: client,
            vehicles: vehicles
        })

    }
    @Post('/edit/:dni_nif')
    async editPost(ctx: Context){
        let client = await Client.findOne({dni_nif: ctx.request.params.dni_nif});
        // @ts-ignore
        client?.name           = ctx.request.body.name;
        // @ts-ignore
        client?.dni_nif        = ctx.request.body.dni_nif;
        // @ts-ignore
        client?.surname        = ctx.request.body.surname;
        // @ts-ignore
        client?.email          = ctx.request.body.email;
        // @ts-ignore
        client?.phone_number1  = ctx.request.body.phone_number1;
        // @ts-ignore
        client?.phone_number2  = ctx.request.body.phone_number2;
        // @ts-ignore
        client?.address        = ctx.request.body.address;

        // @ts-ignore
        client?.vehicles       = [await Vehicle.findOne({number_plate: ctx.request.body.number_plate})];

        // @ts-ignore
        await client.save();

        return new HttpResponseRedirect('/client');
    }
    @Get('/delete/:dni_nif')
    async delete(ctx: Context){
        const client = await Client.findOne({dni_nif:ctx.request.params.dni_nif})
        // @ts-ignore
        client.remove();
        return new HttpResponseRedirect('/client')
    }

}
