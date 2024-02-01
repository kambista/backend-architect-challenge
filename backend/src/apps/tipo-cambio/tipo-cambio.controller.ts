import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProveedorTipoCambioApplication } from 'src/Context/TipoCambio/Application/ProveedorTipoCambioApplication';
import { SolicitudesApplication } from 'src/Context/TipoCambio/Application/SolicitudesApplication';

@Controller('api/v1/tipo-cambio')
export class TipoCambioController {
    
    constructor(
        private readonly proveedorAplicacion:ProveedorTipoCambioApplication,
        private readonly solicitudAplicacion:SolicitudesApplication, 
    ){}

    @Get("cron-job")
    async proveedorCronJob():Promise<void>{
        await this.proveedorAplicacion.tipoCambioAlmanacenar();
    }

    @Post("crear-solicitud")
    async generarSolicitud(@Body() data: any):Promise<any>{
        return await this.solicitudAplicacion.generarSolicitudCambio(data);
    }

    @Get("hisotial-solicitudes/:inicio/:fin")
    async historialSolicitudes(@Param('inicio') fechaInicio:any, @Param('fin') fechaFin:any):Promise<any>{
        return await this.solicitudAplicacion.obtenerHistorial({fechaInicio, fechaFin})
    }
}
