import { Primitives } from "src/Context/Shared/Domain/Primitives"
import { Moneda } from "../Properties/Moneda"
import { NombreMoneda } from "../Properties/NombreMoneda"
import { AggregateRoot } from "src/Context/Shared/Domain/AggregateRoot"

export class SolicitudTipoCambio extends AggregateRoot{

  private constructor(
    readonly monedaOrigen:NombreMoneda,
    readonly monedaDestino:NombreMoneda,
    readonly monto:Moneda,
  ){
    super();
  }

  public static create(data:Primitives<SolicitudTipoCambio>){
    return new SolicitudTipoCambio(
        new NombreMoneda(data.monedaOrigen),
        new NombreMoneda(data.monedaDestino),
        new Moneda(data.monto),
    )
  }

  public toPrimitives():Primitives<SolicitudTipoCambio>{
    return {
        monedaOrigen:this.monedaOrigen.value,
        monedaDestino:this.monedaDestino.value,
        monto:this.monto.value,
    }
  }
}
