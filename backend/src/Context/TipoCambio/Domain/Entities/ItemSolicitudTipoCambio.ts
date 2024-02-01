import { Primitives } from "src/Context/Shared/Domain/Primitives"
import { Fecha } from "../Properties/Fecha"
import { Moneda } from "../Properties/Moneda"
import { NombreMoneda } from "../Properties/NombreMoneda"
import { Id } from "../Properties/Id"
import { AggregateRoot } from "src/Context/Shared/Domain/AggregateRoot"

export class ItemSolicitudTipoCambio extends AggregateRoot{

  private constructor(
    readonly id:Id,
    readonly monedaOrigen:NombreMoneda,
    readonly monedaDestino:NombreMoneda,
    readonly monto:Moneda,
    readonly montoCambiado:Moneda,
    readonly tipoCambio:Moneda,
    readonly fecha:Fecha,
  ){
    super()
  }

  public static create(data:Primitives<ItemSolicitudTipoCambio>){
    return new ItemSolicitudTipoCambio(
        new Id(data.id),
        new NombreMoneda(data.monedaOrigen),
        new NombreMoneda(data.monedaDestino),
        new Moneda(data.monto),
        new Moneda(data.montoCambiado),
        new Moneda(data.tipoCambio),
        new Fecha(data.fecha),
    )
  }

  public toPrimitives():Primitives<ItemSolicitudTipoCambio>{
    return {
        id:this.id.value,
        monedaOrigen:this.monedaOrigen.value,
        monedaDestino:this.monedaDestino.value,
        monto:this.monto.value,
        montoCambiado:this.montoCambiado.value,
        tipoCambio:this.tipoCambio.value,
        fecha:this.fecha.value,
    }
  }
}
