import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Products } from './entity/products.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    private notificationService: NotificationsService,
  ) {}

  async findAllByUser(username: Users['username']): Promise<Products[]> {
    return await this.productsRepository
      .createQueryBuilder('products')
      .where('products.created_by = :username', {
        username,
      })
      .getMany();
  }

  async findOneById(id: Products['id']): Promise<Products> {
    const product = await this.productsRepository
      .createQueryBuilder('products')
      .where('products.id = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(
    username: Users['username'],
    product: Products,
  ): Promise<Products> {
    const newProduct = await this.productsRepository.create({
      ...product,
      created_by: username,
    });

    // create notification
    const newNotification = await this.notificationService.create(
      username,
      `Product ${product.product_name} has been created`,
      'success',
    );

    return newProduct;
  }

  async edit(
    username: Users['username'],
    productId: number,
    updatedProduct: Object | any,
  ): Promise<UpdateResult> {
    const product = await this.findOneById(productId);
    if (!product) {
      // create notification
      const newNotification = await this.notificationService.create(
        username,
        `Product ${product.product_name} does not exist`,
        'error',
      );

      throw new BadRequestException('Product does not exist');
    }

    const editedProduct = await this.productsRepository.update(
      { id: productId },
      {
        ...updatedProduct,
        updated_at: new Date(),
      },
    );

    // create notification
    const newNotification = await this.notificationService.create(
      username,
      `Product ${updatedProduct.product_name} has been updated`,
      'success',
    );

    return editedProduct;
  }

  async delete(
    username: Users['username'],
    id: Products['id'],
  ): Promise<Products> {
    const product = await this.findOneById(id);
    if (!product) {
      // create notification
      const newNotification = await this.notificationService.create(
        username,
        `Product ${product.product_name} does not exist`,
        'error',
      );

      throw new BadRequestException('Product does not exist');
    }

    const deletedProduct = await this.productsRepository.remove(product);

    // create notification
    const newNotification = await this.notificationService.create(
      username,
      `Product ${product.product_name} has been deleted`,
      'success',
    );

    return deletedProduct;
  }
}
