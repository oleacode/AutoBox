// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Register} from './register.entity';
import {Client} from './client.entity';

@Entity()
export class Vehicle extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number_plate: string;

  @Column()
  mark: string;

  @Column()
  model: string;

  @Column()
  kms: number;

  //@Column({type: 'date'})
  //time_register: number;

  @ManyToMany( type => Register, register => register.vehicles)
  @JoinTable()
  registers: Register[]

  @ManyToMany(type => Client, client => client.vehicles)
  @JoinTable({
    name: 'vehicles_clients'
  })
  clients: Client[];

}
