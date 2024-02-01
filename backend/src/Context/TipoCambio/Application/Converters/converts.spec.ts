import { SolicitudTipoCambioRepository } from "../../Domain/SolicitudTipoCambioRepository";
import { SolToDollarConverter } from "./SolToDollarConverter"; 
import { FiltroHistorialSolicitudes } from "../../Domain/Criteria/FiltroHistorialSolicitudes";
import { ItemSolicitudTipoCambio } from "../../Domain/Entities/ItemSolicitudTipoCambio";
import { TipoCambio } from "../../Domain/Entities/TipoCambio";
import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";

class MockSolicitudTipoCambioRepository implements SolicitudTipoCambioRepository {

    // TODO: Solid
    generarSolicitudCambio(data: ItemSolicitudTipoCambio): Promise<void> {
        throw new Error("Method not implemented.");
    }
    obtenerHistorial(data: FiltroHistorialSolicitudes): Promise<ItemSolicitudTipoCambio[]> {
        throw new Error("Method not implemented.");
    }
    guardarCambio(data: TipoCambio): Promise<void> {
        throw new Error("Method not implemented.");
    }
    // -----

    async obtenerTipoCambioDollar(): Promise<{ value: number }> {
      return { value: 3.5 };
    }
  }

  describe('SolToDollarConverter', () => {
    it('debería convertir correctamente de SOL a DÓLAR', async () => {
      const repository = new MockSolicitudTipoCambioRepository();
      const converter = new SolToDollarConverter(repository);
  
      const amountInSol = 3.5;
      const convertedResult = await converter.convert(amountInSol, NombreMonedaEnum.PEN, NombreMonedaEnum.USD);

      expect(convertedResult).toBeInstanceOf(ItemSolicitudTipoCambio);
      expect(convertedResult.monto.value).toBe(amountInSol);
      expect(convertedResult.monedaOrigen.value).toBe(NombreMonedaEnum.PEN);
      expect(convertedResult.monedaDestino.value).toBe(NombreMonedaEnum.USD);
      expect(convertedResult.montoCambiado.value).toBe(1);
    });
  });
