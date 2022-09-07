import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const mongodbUri = config.get<string>('MONGODB_URI');
        const dbName = config.get<string>('DB_NAME');
        return {
          uri: `${mongodbUri}/${dbName}`,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
