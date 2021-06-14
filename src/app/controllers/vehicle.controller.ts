import {Context, Get, HttpResponseOK, HttpResponseRedirect, Post, render} from '@foal/core';
import {Client, Vehicle} from '../entities';

export class VehicleController {

  @Get('/')
  async indexVehicles(ctx: Context){
    const vehicles = await Vehicle.find({relations:['clients', 'registers', 'registers.worksRegisters']});
    return await render('./templates/panel/clients_vehicles/vehicles/index.html.twig', {
      vehicles: vehicles
    })
  }

//CREACIÓN DE UN NUEVO VEHÍCULO
  @Get('/new')
  async newGetVehicle(ctx: Context){
    const clients = await Client.find()
    return await render('./templates/panel/clients_vehicles/vehicles/new.html.twig', {
      clients: clients
    })
  }
//GUARDAMOS EL VEHÍCULO NUEVO
  @Post('/new')
  async newPostVehicle(ctx: Context){
    const vehicle = new Vehicle()
    // eslint-disable-next-line @typescript-eslint/camelcase
    vehicle.number_plate = ctx.request.body.number_plate;
    vehicle.kms          = ctx.request.body.kms;
    vehicle.mark         = ctx.request.body.mark;
    vehicle.model        = ctx.request.body.model;

    const client         =  await Client.findOne({dni_nif: ctx.request.body.client});
    // @ts-ignore
    vehicle.clients      = [client];

    await vehicle.save()
    return new HttpResponseRedirect('/api/vehicles');
  }
//ACCEDEMOS A LOS DETALLES DEL VEHICULO
  @Get('/show/:number_plate')
  async showVehicles(ctx: Context){

    const  vehicle = await Vehicle.findOne({number_plate: ctx.request.params.number_plate},{relations:['clients', 'registers', 'registers.worksRegisters', 'registers.worksRegisters.product', 'registers.worksRegisters.worker']})
    return await render('./templates/panel/clients_vehicles/vehicles/show.html.twig',{
      vehicle: vehicle
    })
  }

//BORRAMOS UN VEHÍCULO
  @Get('/delete/:number_plate')
  async  deleteVehicle(ctx: Context){
    const vehicleDeleted = await Vehicle.findOne({number_plate: ctx.request.params.number_plate});
    // @ts-ignore
    await vehicleDeleted.remove()

    return new HttpResponseRedirect('/api/vehicles');
  }

  //edit
  @Get('/edit/:number_plate')
  async edit(ctx: Context){
    const vehicle = await Vehicle.findOne({number_plate: ctx.request.params.number_plate},{relations:['clients', 'registers', 'registers.worksRegisters', 'registers.worksRegisters.product', 'registers.worksRegisters.worker']})
    const clients = await Client.find()
    return await render('./templates/panel/clients_vehicles/vehicles/edit.html.twig',{
      vehicle: vehicle,
      clients : clients
    })
  }
  @Post('/edit/:number_plate')
  async editVehicles(ctx: Context){
    const vehicle = await Vehicle.findOne({number_plate: ctx.request.params.number_plate});

    // @ts-ignore
    vehicle.number_plate = ctx.request.body.number_plate;
    // @ts-ignore
    vehicle?.kms          = ctx.request.body.kms;
    // @ts-ignore
    vehicle?.mark         = ctx.request.body.mark;
    // @ts-ignore
    vehicle?.model        = ctx.request.body.model;
    // @ts-ignore
    vehicle?.clients      = [await Client.findOne({dni_nif: ctx.request.body.client})];

    // @ts-ignore
    await vehicle.save();
    return new HttpResponseRedirect('/vehicle');
  }
}
