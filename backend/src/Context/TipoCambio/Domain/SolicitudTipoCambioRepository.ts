import { FiltroHistorialSolicitudes } from "./Criteria/FiltroHistorialSolicitudes";
import { ItemSolicitudTipoCambio } from "./Entities/ItemSolicitudTipoCambio"
import { SolicitudTipoCambio } from "./Entities/SolicitudTipoCambio"
import { TipoCambio } from "./Entities/TipoCambio";

export interface SolicitudTipoCambioRepository{
    generarSolicitudCambio(data:SolicitudTipoCambio):Promise<ItemSolicitudTipoCambio>
    obtenerHistorial(data:FiltroHistorialSolicitudes):Promise<ItemSolicitudTipoCambio[]>
    guardarCambio(data:TipoCambio):Promise<void>
}

export const SolicitudTipoCambioRepository = Symbol("SolicitudTipoCambioRepository");