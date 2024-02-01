import { Primitives } from "src/Context/Shared/Domain/Primitives"
import { Fecha } from "../Properties/Fecha"
import { Moneda } from "../Properties/Moneda"
import { Origen } from "../Properties/Origen"
import { NombreMoneda } from "../Properties/NombreMoneda"
import { AggregateRoot } from "src/Context/Shared/Domain/AggregateRoot"

export class TipoCambio extends AggregateRoot{

  private constructor(
    readonly compra:Moneda,
    readonly venta:Moneda,
    readonly origen:Origen,
    readonly moneda:NombreMoneda,
    readonly fecha:Fecha,
  ){
    super();
  }

  public static create(data:Primitives<TipoCambio>){
    return new TipoCambio(
        new Moneda(data.compra),
        new Moneda(data.venta),
        new Origen(data.origen),
        new NombreMoneda(data.moneda),
        new Fecha(data.fecha),
    )
  }

  public toPrimitives():Primitives<TipoCambio>{
    return {
        compra:this.compra.value,
        venta:this.venta.value,
        origen:this.origen.value,
        moneda:this.moneda.value,
        fecha:this.fecha.value,
    }
  }
}
