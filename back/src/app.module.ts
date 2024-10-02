import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './category/category.module';
// import { AppointmentModule } from './appointment/appointment.module';


@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [ postgresDataSourceConfig]
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get('postgres')
      }),
      UsersModule,
      ProductsModule,
      CategoriesModule,
      // AppointmentModule,
    ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})

export class AppModule {}




