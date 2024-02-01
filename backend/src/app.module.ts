import { Module } from "@nestjs/common";
import { ProveedorTipoCambioRepository } from "./Context/TipoCambio/Domain/ProveedorTipoCambioRepository";
import { SunatProveedorTipoCambioRepositoryImp } from "./Context/TipoCambio/Infrastructure/SunatProveedorTipoCambioRepositoryImp";
import { TipoCambioController } from "./apps/tipo-cambio/tipo-cambio.controller";
import { ProveedorTipoCambioApplication } from "./Context/TipoCambio/Application/ProveedorTipoCambioApplication";
import { SolicitudesApplication } from "./Context/TipoCambio/Application/SolicitudesApplication";
import { SolicitudTipoCambioRepository } from "./Context/TipoCambio/Domain/SolicitudTipoCambioRepository";
import { MongoDbSolicitudTipoCambioRepositoryImp } from "./Context/TipoCambio/Infrastructure/MongoDbSolicitudTipoCambioRepositoryImp";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env"],
			isGlobal: true,
		}),
	],
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
