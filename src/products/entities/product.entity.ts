import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{unique: true })
  title: string;

  @Column('text',{nullable: true})
  description: string

  @Column('int',{ default: 0 })
  stock: number

  @Column('float')
  price: number

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;
}
