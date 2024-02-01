import { Inject, Injectable } from "@nestjs/common";
import { ProveedorTipoCambioRepository } from "../Domain/ProveedorTipoCambioRepository";
import { SolicitudTipoCambioRepository } from "../Domain/SolicitudTipoCambioRepository";

@Injectable()
export class ProveedorTipoCambioApplication{
    constructor(
        @Inject(ProveedorTipoCambioRepository) private readonly repository:ProveedorTipoCambioRepository,
        @Inject(SolicitudTipoCambioRepository) private readonly repositoryDb:SolicitudTipoCambioRepository,

    ){}

    async tipoCambioAlmanacenar():Promise<void>{
        const data = await this.repository.obtenerCambio();
        await this.repositoryDb.guardarCambio(data);
    }
}