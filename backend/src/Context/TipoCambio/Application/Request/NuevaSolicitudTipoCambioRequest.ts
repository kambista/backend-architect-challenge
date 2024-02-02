import { ApiProperty } from "@nestjs/swagger";
import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";

export class NuevaSolicitudTipoCambioRequest{

	@ApiProperty({default:'USD'})
    monedaOrigen:NombreMonedaEnum;
	@ApiProperty({default:'PEN'})
    monedaDestino:NombreMonedaEnum;
	@ApiProperty({default:1})
    monto:number;
}