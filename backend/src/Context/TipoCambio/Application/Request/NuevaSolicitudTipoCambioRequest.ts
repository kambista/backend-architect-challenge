import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";

export interface NuevaSolicitudTipoCambioRequest{
    monedaOrigen:NombreMonedaEnum;
    monedaDestino:NombreMonedaEnum;
    monto:number;
}