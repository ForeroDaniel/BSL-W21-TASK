import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRoles } from 'common/enum-roles.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Products')
@Auth(UserRoles.USER)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(UserRoles.USER)
  @Post('create')
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.createProduct(createProductDto, user);
  }

  @Auth(UserRoles.ADMIN)
  @Get('getAll')
  findAll() {
    return this.productsService.findAllProducts();
  }

  @Get('getBy:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('updateBy:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('remove:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
