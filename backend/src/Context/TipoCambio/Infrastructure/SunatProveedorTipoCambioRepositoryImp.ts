import { Injectable } from "@nestjs/common";
import { TipoCambio } from "../Domain/Entities/TipoCambio";
import { ProveedorTipoCambioRepository } from "../Domain/ProveedorTipoCambioRepository";
import axios from "axios";

@Injectable()
export class SunatProveedorTipoCambioRepositoryImp implements ProveedorTipoCambioRepository{

    async obtenerCambio(): Promise<TipoCambio> {
        const resp = await axios.get("https://api.apis.net.pe/v1/tipo-cambio-sunat");
        return TipoCambio.create(resp.data);
    }

}