// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { WorkRegister} from './work-register.entity';

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 13, nullable:true})
  bar_code: string;

  @Column()
  name: string;

  @Column()
  mark: string;

  @Column()
  model: string;

  @Column()
  price: number;

  @Column({nullable:true})
  description: string;

  @Column()
  stock: number;

  @OneToMany(() => WorkRegister, workRegister => workRegister.product)
  public worksRegisters!: WorkRegister[];


}
