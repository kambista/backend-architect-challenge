import { NombreMonedaEnum } from "../../Domain/Constants/NombreMoneda.enum";
import { ItemSolicitudTipoCambio } from "../../Domain/Entities/ItemSolicitudTipoCambio";
import { SolicitudTipoCambioRepository } from "../../Domain/SolicitudTipoCambioRepository";
import { CurrencyConverterStrategy } from "./CurrencyConverterStrategy";
import { DollarToSolConverter } from "./DollarToSolConverter";
import { SolToDollarConverter } from "./SolToDollarConverter";

export class CurrencyConverterContext {

    constructor(private readonly repository:SolicitudTipoCambioRepository){}

	async convert(amount: number, fromCurrency: NombreMonedaEnum, toCurrency: NombreMonedaEnum): Promise<ItemSolicitudTipoCambio> {
		const strategy = this.getStrategy(fromCurrency, toCurrency);
		return strategy.convert(amount, fromCurrency, toCurrency);
	}

	private getStrategy(fromCurrency: NombreMonedaEnum, toCurrency: NombreMonedaEnum): CurrencyConverterStrategy {
		if (fromCurrency === NombreMonedaEnum.PEN && toCurrency === NombreMonedaEnum.USD) {
			return new SolToDollarConverter(this.repository);
		}

		if (fromCurrency === NombreMonedaEnum.USD && toCurrency === NombreMonedaEnum.PEN) {
			return new DollarToSolConverter(this.repository);
		}
	}
}
