import { TipoCambio } from "./Entities/TipoCambio";

export interface ProveedorTipoCambioRepository{
    obtenerCambio():Promise<TipoCambio>
}

export const ProveedorTipoCambioRepository = Symbol("ProveedorTipoCambioRepository");