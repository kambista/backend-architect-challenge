import { Injectable } from "@nestjs/common";
import { FiltroHistorialSolicitudes } from "../Domain/Criteria/FiltroHistorialSolicitudes";
import { ItemSolicitudTipoCambio } from "../Domain/Entities/ItemSolicitudTipoCambio";
import { SolicitudTipoCambio } from "../Domain/Entities/SolicitudTipoCambio";
import { TipoCambio } from "../Domain/Entities/TipoCambio";
import { SolicitudTipoCambioRepository } from "../Domain/SolicitudTipoCambioRepository";

@Injectable()
export class MongoDbSolicitudTipoCambioRepositoryImp implements SolicitudTipoCambioRepository{

    async generarSolicitudCambio(data: SolicitudTipoCambio): Promise<ItemSolicitudTipoCambio> {
        throw new Error("Method not implemented.");
    }

    async obtenerHistorial(data:FiltroHistorialSolicitudes): Promise<ItemSolicitudTipoCambio[]> {
        throw new Error("Method not implemented.");
    }

    async guardarCambio(data: TipoCambio): Promise<void> {
        throw new Error("Method not implemented.");
    }
}