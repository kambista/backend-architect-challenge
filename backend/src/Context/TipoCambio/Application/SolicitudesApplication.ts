import { Inject, Injectable } from "@nestjs/common";
import { SolicitudTipoCambioRepository } from "../Domain/SolicitudTipoCambioRepository";
import { NuevaSolicitudTipoCambioRequest } from "./Request/NuevaSolicitudTipoCambioRequest";
import { ItemSolicitudTipoCambio } from "../Domain/Entities/ItemSolicitudTipoCambio";
import { Primitives } from "src/Context/Shared/Domain/Primitives";
import { FiltroHistorialSolicitudesRequest } from "./Request/FiltroHistorialSolicitudesRequest";
import { FiltroHistorialSolicitudes } from "../Domain/Criteria/FiltroHistorialSolicitudes";
import { CurrencyConverterContext } from "./Converters/CurrencyConverterContext";

@Injectable()
export class SolicitudesApplication{
    constructor(
        @Inject(SolicitudTipoCambioRepository) private readonly repository:SolicitudTipoCambioRepository,
    ){}

    async generarSolicitudCambio(data:NuevaSolicitudTipoCambioRequest):Promise<Primitives<ItemSolicitudTipoCambio>>{
        const converterContext = new CurrencyConverterContext(this.repository);
        const itemSolicitud = await converterContext.convert(data.monto, data.monedaOrigen, data.monedaDestino);
        await this.repository.generarSolicitudCambio(itemSolicitud);
        return itemSolicitud.toPrimitives();
    }

    async obtenerHistorial(data:FiltroHistorialSolicitudesRequest):Promise<Primitives<ItemSolicitudTipoCambio>[]>{
        const resp = await this.repository.obtenerHistorial(FiltroHistorialSolicitudes.create(data));
        return resp.map(v=>v.toPrimitives());
    }
}