import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";
import { ItemSolicitudTipoCambio } from "../../Domain/Entities/ItemSolicitudTipoCambio";

export interface CurrencyConverterStrategy{
    convert(amount:number, fromCurrency: NombreMonedaEnum, toCurrency: NombreMonedaEnum):Promise<ItemSolicitudTipoCambio>;
}