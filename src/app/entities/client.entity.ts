// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Vehicle} from "./vehicle.entity";

@Entity()
export class Client extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, length: 9})
  dni_nif: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone_number1: number;

  @Column()
  phone_number2: number;

  @Column()
  address: string;


  @ManyToMany(type => Vehicle, vehicle => vehicle.clients,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  vehicles: Vehicle[];

}
