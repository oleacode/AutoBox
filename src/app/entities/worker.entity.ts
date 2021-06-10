// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {WorkRegister} from './work-register.entity';

let workRegister;

@Entity()
export class Worker extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, length: 9})
  dni: string;

  @Column( {length: 12, unique: true})
  nss: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({nullable:true})
  phone_number1: number;

  @Column({nullable: true})
  phone_number2: number;

  @OneToMany(() => WorkRegister, workRegister => workRegister.worker)
  public worksRegisters!: WorkRegister[];

}
