import { FiltroHistorialSolicitudes } from "./Criteria/FiltroHistorialSolicitudes";
import { ItemSolicitudTipoCambio } from "./Entities/ItemSolicitudTipoCambio"
import { SolicitudTipoCambio } from "./Entities/SolicitudTipoCambio"
import { TipoCambio } from "./Entities/TipoCambio";
import { Moneda } from "./Properties/Moneda";

export interface SolicitudTipoCambioRepository{
    generarSolicitudCambio(data:ItemSolicitudTipoCambio):Promise<void>
    obtenerHistorial(data:FiltroHistorialSolicitudes):Promise<ItemSolicitudTipoCambio[]>
    guardarCambio(data:TipoCambio):Promise<void>
    obtenerTipoCambioDollar():Promise<Moneda>;
}

export const SolicitudTipoCambioRepository = Symbol("SolicitudTipoCambioRepository");