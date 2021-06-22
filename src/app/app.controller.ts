import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import {ApiController, ClientController, RegisterController, VehicleController} from './controllers';

export class AppController implements IAppController {
  subControllers = [
      controller('/api', ApiController),
      controller('/vehicle', VehicleController),
      controller('/client', ClientController),
      controller('/register', RegisterController)
  ];

  async init() {
    await createConnection();
  }
}
