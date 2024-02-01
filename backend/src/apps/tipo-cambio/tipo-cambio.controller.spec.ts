import { Test, TestingModule } from "@nestjs/testing";
import { TipoCambioController } from "./tipo-cambio.controller";
import { SolicitudesApplication } from "src/Context/TipoCambio/Application/SolicitudesApplication";
import { ProveedorTipoCambioApplication } from "src/Context/TipoCambio/Application/ProveedorTipoCambioApplication";

describe("TipoCambioController prueba de integracion", () => {
	let controller: TipoCambioController;
	let proveedorAplicationMock: Partial<ProveedorTipoCambioApplication>;
	let solicitudesAplicationMock: Partial<SolicitudesApplication>;

	beforeEach(async () => {
		const dataResp = {
			id: "88d8b0c8-29b3-436f-bfda-de156d0fc1db",
			monedaOrigen: "PEN",
			monedaDestino: "USD",
			monto: 3.799,
			montoCambiado: 1,
			tipoCambio: 3.799,
			fecha: "2024-02-01T14:46:55.861-05:00",
		};

		proveedorAplicationMock = {
			tipoCambioAlmanacenar: jest.fn(),
		};

		solicitudesAplicationMock = {
			generarSolicitudCambio: jest.fn().mockReturnValue(dataResp),
			obtenerHistorial: jest.fn().mockReturnValue([dataResp]),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [TipoCambioController],
			providers: [
				{
					provide: SolicitudesApplication,
					useValue: solicitudesAplicationMock,
				},
				{
					provide: ProveedorTipoCambioApplication,
					useValue: proveedorAplicationMock,
				},
			],
		}).compile();

		controller = module.get<TipoCambioController>(TipoCambioController);
	});

	describe("Generar una solicitud", () => {
		it("Deberia guardar y retornar la informacion correcta", async () => {
			const dataSend:any = {
				monedaOrigen: "PEN",
				monedaDestino: "USD",
				monto: 3.799,
			};

			const dataResp = {
				id: "88d8b0c8-29b3-436f-bfda-de156d0fc1db",
				monedaOrigen: "PEN",
				monedaDestino: "USD",
				monto: 3.799,
				montoCambiado: 1,
				tipoCambio: 3.799,
				fecha: "2024-02-01T14:46:55.861-05:00",
			};

			const result = await controller.generarSolicitud(dataSend);
			expect(solicitudesAplicationMock.generarSolicitudCambio).toHaveBeenCalled();
			expect(result).toEqual(dataResp);
		});
	});

	describe("Obtener historial de solicitudes", () => {
		it("Deberia devolver la lista de solicitudes", async () => {
			const dataResp = {
				id: "88d8b0c8-29b3-436f-bfda-de156d0fc1db",
				monedaOrigen: "PEN",
				monedaDestino: "USD",
				monto: 3.799,
				montoCambiado: 1,
				tipoCambio: 3.799,
				fecha: "2024-02-01T14:46:55.861-05:00",
			};

			const result = await controller.historialSolicitudes("01-10-2000", "12-12-2024");
			expect(solicitudesAplicationMock.obtenerHistorial).toHaveBeenCalled();
			expect(result).toEqual([dataResp]);
		});
	});

	describe("Guardar el tipo de cambio del proveedor", () => {
		it("Deberia llamar a la capa de aplicacion", async () => {
			const dataResp = {
				id: "88d8b0c8-29b3-436f-bfda-de156d0fc1db",
				monedaOrigen: "PEN",
				monedaDestino: "USD",
				monto: 3.799,
				montoCambiado: 1,
				tipoCambio: 3.799,
				fecha: "2024-02-01T14:46:55.861-05:00",
			};

			const result = await controller.proveedorCronJob();
			expect(proveedorAplicationMock.tipoCambioAlmanacenar).toHaveBeenCalled();
			expect(result).toEqual(undefined);
		});
	});
});
