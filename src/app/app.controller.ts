import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import { ApiController } from './controllers';
import {VehicleController} from './controllers';

export class AppController implements IAppController {
  subControllers = [
      controller('/api', ApiController),
      controller('/vehicle', VehicleController)
  ];

  async init() {
    await createConnection();
  }
}
