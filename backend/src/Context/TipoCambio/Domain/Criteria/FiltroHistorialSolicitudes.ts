import { Primitives } from "src/Context/Shared/Domain/Primitives"
import { Fecha } from "../Properties/Fecha"

export class FiltroHistorialSolicitudes{

  private constructor(
    readonly fechaInicio:Fecha,
    readonly fechaFin:Fecha,
  ){}

  public static create(data:Primitives<FiltroHistorialSolicitudes>){
    return new FiltroHistorialSolicitudes(
        new Fecha(data.fechaInicio),
        new Fecha(data.fechaFin),
    )
  }

  public toPrimitives():Primitives<FiltroHistorialSolicitudes>{
    return {
        fechaInicio:this.fechaInicio.value,
        fechaFin:this.fechaFin.value,
    }
  }
}
