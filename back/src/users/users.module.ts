import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SharedModule } from "src/shared/shared.module";


@Module({
    imports: [SharedModule, TypeOrmModule.forFeature([User])],
    providers: [ UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule{}