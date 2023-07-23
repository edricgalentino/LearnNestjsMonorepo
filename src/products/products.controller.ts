import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from 'src/users/entity/users.entity';
import { Products } from './entity/products.entity';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async getAllProducts(@CurrentUser() user: Users) {
    return await this.productService.findAllByUser(user.username);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return await this.productService.findOneById(id);
  }

  @Post()
  async createProduct(@CurrentUser() user: Users, product: Products) {
    const newProduct = await this.productService.create(user.username, product);
    return newProduct;
  }

  @Put(':id')
  async editProduct(
    @CurrentUser() user: Users,
    @Param('id') id: number,
    @Body() product: UpdateProductDTO,
  ) {
    return await this.productService.edit(user.username, id, product);
  }

  @Delete(':id')
  async deleteProduct(@CurrentUser() user: Users, @Param('id') id: number) {
    return await this.productService.delete(user.username, id);
  }
}
