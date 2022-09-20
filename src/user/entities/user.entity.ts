import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column('text', {unique: true})
email: string;

@Column('text')
fullname: string

@Column('text')
password: string

@Column('bool', {default: true})
active: boolean

@Column('simple-array', {default: 'user'})
roles: string[]

@OneToMany(() => Product, (product) => product.user)
  product: Product;
}
