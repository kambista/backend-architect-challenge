import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProveedorTipoCambioApplication } from 'src/Context/TipoCambio/Application/ProveedorTipoCambioApplication';
import { NuevaSolicitudTipoCambioRequest } from 'src/Context/TipoCambio/Application/Request/NuevaSolicitudTipoCambioRequest';
import { SolicitudesApplication } from 'src/Context/TipoCambio/Application/SolicitudesApplication';

@ApiTags("Servicios")
@Controller('api/v1/tipo-cambio')
export class TipoCambioController {
    
    constructor(
        private readonly proveedorAplicacion:ProveedorTipoCambioApplication,
        private readonly solicitudAplicacion:SolicitudesApplication, 
    ){}

    @Get("cron-job")
    @ApiOperation({summary:"Servicio que será ejecutado por un cron-job de kubernetes"})
    async proveedorCronJob():Promise<void>{
        await this.proveedorAplicacion.tipoCambioAlmanacenar();
    }

    @Post("crear-solicitud")
    @ApiOperation({summary:"Servicio para crear una solicitud de compra"})
    async generarSolicitud(@Body() data: any):Promise<any>{
        return await this.solicitudAplicacion.generarSolicitudCambio(data);
    }

    @Get("hisotial-solicitudes/:inicio/:fin")
    @ApiParam({name:"inicio", description:"Fecha de inicio"})
    @ApiParam({name:"fin", description:"Fecha de fin"})
    @ApiOperation({summary:"Historial de todas las solicitudes en un rango de fechas"})
    async historialSolicitudes(@Param('inicio') fechaInicio:any, @Param('fin') fechaFin:any):Promise<any>{
        return await this.solicitudAplicacion.obtenerHistorial({fechaInicio, fechaFin})
    }
}
