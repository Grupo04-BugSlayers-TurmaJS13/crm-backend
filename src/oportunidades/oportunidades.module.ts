import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OportunidadeController } from "./controllers/oportunidades.controller";
import { Oportunidade } from "./entities/oportunidades.entity";
import { OportunidadeService } from "./services/oportunidades.service";


@Module({
    imports:[TypeOrmModule.forFeature([Oportunidade])],
    controllers:[OportunidadeController],
    providers:[OportunidadeService],
    exports:[OportunidadeService]
})
export class OportunidadeModule{}