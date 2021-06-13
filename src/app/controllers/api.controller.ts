import {Context, Get, HttpResponseRedirect, Post, render} from '@foal/core';
import {Client, Vehicle} from '../entities';

export class ApiController {

  @Get('/')
  async index(ctx: Context) {
    return await render('./templates/panel/index.html.twig');
  }
//Controladores apartado vehiculos

  @Get('/vehicles')
  async indexVehicles(ctx: Context){
    const vehicles = await Vehicle.find({relations:['clients', 'registers', 'registers.worksRegisters']});
    return await render('./templates/panel/clients_vehicles/vehicles/index.html.twig', {
      vehicles: vehicles
    })
  }

  @Get('/vehicles/new')
  async newGetVehicle(ctx: Context){
    const clients = await Client.find()
    return await render('./templates/panel/clients_vehicles/vehicles/new.html.twig', {
      clients: clients
    })
  }

  @Post('/vehicles/new')
  async newPostVehicle(ctx: Context){
    const vehicle = new Vehicle()
    // eslint-disable-next-line @typescript-eslint/camelcase
    vehicle.number_plate = ctx.request.body.number_plate;
    vehicle.kms          = ctx.request.body.kms;
    vehicle.mark         = ctx.request.body.mark;
    vehicle.model        = ctx.request.body.model;

    const client           =  await Client.findOne({dni_nif: ctx.request.body.client});
    // @ts-ignore
    vehicle.clients      = [client];

    await vehicle.save()
    return new HttpResponseRedirect('/api/vehicles');
  }

  @Get('/vehicles/show/:number_plate')
  async showVehicles(ctx: Context){

    const  vehicle = await Vehicle.findOne({number_plate: ctx.request.params.number_plate},{relations:['clients', 'registers', 'registers.worksRegisters', 'registers.worksRegisters.product', 'registers.worksRegisters.worker']})
    return await render('./templates/panel/clients_vehicles/vehicles/show.html.twig',{
      vehicle: vehicle
    })
  }

  @Get('/vehicles/edit/:number_plate')
  async editVehicles(ctx: Context){
    const vehicle = await Vehicle.findOne({number_plate: ctx.request.params.number_plate},{relations:['clients', 'registers', 'registers.worksRegisters', 'registers.worksRegisters.product', 'registers.worksRegisters.worker']})
      return await render('./templates/panel/clients_vehicles/vehicles/edit.html.twig',{
      vehicle: vehicle
    })
  }

  @Get('/vehicles/delete/:number_plate')
  async  deleteVehicle(ctx: Context){
    const vehicleDeleted = await Vehicle.findOne({number_plate: ctx.request.params.number_plate});
    // @ts-ignore
    await vehicleDeleted.remove()

    return new HttpResponseRedirect('/api/vehicles');
  }
}
