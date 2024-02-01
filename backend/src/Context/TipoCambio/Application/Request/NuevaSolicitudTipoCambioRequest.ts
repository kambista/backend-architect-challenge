import { ApiProperty } from "@nestjs/swagger";
import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";

export class NuevaSolicitudTipoCambioRequest{

	@ApiProperty({default:'PEN'})
    monedaOrigen:NombreMonedaEnum;
	@ApiProperty({default:'USD'})
    monedaDestino:NombreMonedaEnum;
	@ApiProperty({default:1})
    monto:number;
}