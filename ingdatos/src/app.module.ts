import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AppService } from './graphql/app.service';
import { AppResolver } from './graphql/app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
          type: 'mongodb',
          url: 'mongodb://localhost:27017',
          database: 'miapp',
          entities: [UserEntity],
          synchronize: true
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
