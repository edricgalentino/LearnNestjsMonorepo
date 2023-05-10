import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { Products } from './entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async findAllByUser(username: Users['username']): Promise<Products[]> {
    return await this.productsRepository
      .createQueryBuilder('products')
      .where('products.created_by = :username', {
        username,
      })
      .getMany();
  }

  async create(notification: Products): Promise<Products> {
    return await this.productsRepository.create(notification);
  }

  async setIsReadToTrue(notification: Products): Promise<Products> {
    return await this.productsRepository.save({
      ...notification,
      is_read: true,
    });
  }

  async delete(notification: Products): Promise<Products> {
    return await this.productsRepository.remove(notification);
  }
}
