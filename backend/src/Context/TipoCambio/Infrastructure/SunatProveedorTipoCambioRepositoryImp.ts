import { Injectable } from "@nestjs/common";
import { TipoCambio } from "../Domain/Entities/TipoCambio";
import { ProveedorTipoCambioRepository } from "../Domain/ProveedorTipoCambioRepository";

@Injectable()
export class SunatProveedorTipoCambioRepositoryImp implements ProveedorTipoCambioRepository{

    async obtenerCambio(): Promise<TipoCambio> {
        throw new Error("Method not implemented.");
    }

}