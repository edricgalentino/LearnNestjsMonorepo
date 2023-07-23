import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Notifications } from './notifications/entity/notifications.entity';
import { Products } from './products/entity/products.entity';
import { Users } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: async () => ({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: 'learnnestjs1',
      entities: [Users, Products, Notifications],
      synchronize: true,
      autoLoadEntities: true,
      // ssl: process.env.MODE !== 'DEV',
      // }),
    }),
    AuthModule,
    UsersModule,
    NotificationsModule,
    ProductsModule,
  ],
})
export class AppModule {}
