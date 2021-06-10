import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product.entity';
import {Worker} from './worker.entity';
import {Register} from './register.entity';

@Entity()
export class WorkRegister extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public productId!: number;

  @Column()
  public registerId!: number;

  @Column()
  public workerId!: number;

  @Column()
  public quantity!: number;

  @Column()
  public description!: string;


  @ManyToOne(() => Product, product => product.worksRegisters)
  public product!: Product;

  @ManyToOne(() => Worker, worker => worker.worksRegisters)
  public worker!: Worker;

  @ManyToOne( type => Register, register => register.worksRegisters)
  public register!: Register;

}
