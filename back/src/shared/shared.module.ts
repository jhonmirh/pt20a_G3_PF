import { Global, Module } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
    imports: [ConfigModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const secret = configService.get<string>('JWT_SECRET')
            if(!secret){
                throw new Error('JWT_SECRET no esta definido')
            }
            return {
                secret,
                signOptions: { expiresIn: '60m'}
            };
        },           
        }),
    ],
    exports: [JwtModule]
})
export class SharedModule {}