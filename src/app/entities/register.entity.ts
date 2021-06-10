// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Vehicle} from './vehicle.entity';
import {WorkRegister} from './work-register.entity';

@Entity()
export class Register extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cod_follow: string;

  @Column()
  n_receipt: number;

  @Column({default: false})
  pay: boolean;

  @Column({type: 'enum', enum:[0,1,2,3], nullable:true})
  payment: number;

  @Column({type:'date', nullable: true})
  time_register: Date;

  @Column({type:'date', nullable:true})
  time_finished: Date;

  @Column({default: false})
  finished: boolean;

  //@Column({type: 'date'})
  //time_entry: number;

  statePayment() {
    switch (this.payment) {
      case 0: return 'Metálico';
      case 1: return 'Bizum';
      case 2: return 'Transferencia bancaria';
      case 3: return 'Tarjeta';
    }
  }
  statePay() {
    if (!this.payment){
      return 'No pagado'
    }else
    {
      return 'Pagado'
    }
  }

  stateFinish() {
    if (!this.finished){
      return 'No terminado'
    }else
    {
      return 'Terminado'
    }
  }


  @OneToMany(() => WorkRegister, workRegister => workRegister.register)
  public worksRegisters!: WorkRegister[];

  @ManyToMany( type => Vehicle, vehicle => vehicle.registers)
  vehicles: Vehicle[];



}






