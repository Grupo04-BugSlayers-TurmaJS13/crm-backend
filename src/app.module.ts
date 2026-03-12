import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1306',
      database: 'db_conecta_crm',
      entities: [Oportunidade],
      synchronize: true,
      
    }),
    OportunidadeModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
