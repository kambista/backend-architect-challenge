import { Module } from "@nestjs/common";
import { ProveedorTipoCambioRepository } from "./Context/TipoCambio/Domain/ProveedorTipoCambioRepository";
import { SunatProveedorTipoCambioRepositoryImp } from "./Context/TipoCambio/Infrastructure/SunatProveedorTipoCambioRepositoryImp";
import { TipoCambioController } from "./apps/tipo-cambio/tipo-cambio.controller";
import { ProveedorTipoCambioApplication } from "./Context/TipoCambio/Application/ProveedorTipoCambioApplication";
import { SolicitudesApplication } from "./Context/TipoCambio/Application/SolicitudesApplication";
import { SolicitudTipoCambioRepository } from "./Context/TipoCambio/Domain/SolicitudTipoCambioRepository";
import { MongoDbSolicitudTipoCambioRepositoryImp } from "./Context/TipoCambio/Infrastructure/MongoDbSolicitudTipoCambioRepositoryImp";

@Module({
	imports: [],
	controllers: [TipoCambioController],
	providers: [
		{
			provide: ProveedorTipoCambioRepository,
			useClass: SunatProveedorTipoCambioRepositoryImp,
		},
    {
      provide: SolicitudTipoCambioRepository,
      useClass: MongoDbSolicitudTipoCambioRepositoryImp,
    },
		ProveedorTipoCambioApplication,
    SolicitudesApplication,
	],
})
export class AppModule {}
