import { Uuid } from "src/Context/Shared/Domain/ValueObject/Uuid";
import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";
import { ItemSolicitudTipoCambio } from "../../Domain/Entities/ItemSolicitudTipoCambio";
import { Moneda } from "../../Domain/Properties/Moneda";
import { SolicitudTipoCambioRepository } from "../../Domain/SolicitudTipoCambioRepository";
import { CurrencyConverterStrategy } from "./CurrencyConverterStrategy";
import { DateTime } from 'luxon'
export class SolToDollarConverter implements CurrencyConverterStrategy{
    
    constructor(private readonly repository:SolicitudTipoCambioRepository){}

    async convert(amount: number, fromCurrency: NombreMonedaEnum, toCurrency: NombreMonedaEnum): Promise<ItemSolicitudTipoCambio> {
        const tipoCambio:Moneda  = await this.repository.obtenerTipoCambioDollar();
        return ItemSolicitudTipoCambio.create({
            id:Uuid.random().value,
            monedaOrigen:fromCurrency,
            monedaDestino:toCurrency,
            monto:amount,
            montoCambiado:amount/tipoCambio.value,
            tipoCambio:tipoCambio.value,
            fecha:DateTime.now().setZone("America/Lima").toISO(),
        })
    }

}