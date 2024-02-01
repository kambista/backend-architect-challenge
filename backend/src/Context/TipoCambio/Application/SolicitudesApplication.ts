import { Inject, Injectable } from "@nestjs/common";
import { SolicitudTipoCambioRepository } from "../Domain/SolicitudTipoCambioRepository";
import { NuevaSolicitudTipoCambioRequest } from "./Request/NuevaSolicitudTipoCambioRequest";
import { SolicitudTipoCambio } from "../Domain/Entities/SolicitudTipoCambio";
import { ItemSolicitudTipoCambio } from "../Domain/Entities/ItemSolicitudTipoCambio";
import { Primitives } from "src/Context/Shared/Domain/Primitives";
import { FiltroHistorialSolicitudesRequest } from "./Request/FiltroHistorialSolicitudesRequest";
import { FiltroHistorialSolicitudes } from "../Domain/Criteria/FiltroHistorialSolicitudes";

@Injectable()
export class SolicitudesApplication{
    constructor(
        @Inject(SolicitudTipoCambioRepository) private readonly repository:SolicitudTipoCambioRepository,
    ){}

    async generarSolicitudCambio(data:NuevaSolicitudTipoCambioRequest):Promise<Primitives<ItemSolicitudTipoCambio>>{
        const resp = await this.repository.generarSolicitudCambio(SolicitudTipoCambio.create(data));
        return resp.toPrimitives();
    }

    async obtenerHistorial(data:FiltroHistorialSolicitudesRequest):Promise<Primitives<ItemSolicitudTipoCambio>[]>{
        const resp = await this.repository.obtenerHistorial(FiltroHistorialSolicitudes.create(data));
        return resp.map(v=>v.toPrimitives());
    }
}