import { Injectable } from "@nestjs/common";
import { FiltroHistorialSolicitudes } from "../Domain/Criteria/FiltroHistorialSolicitudes";
import { ItemSolicitudTipoCambio } from "../Domain/Entities/ItemSolicitudTipoCambio";
import { SolicitudTipoCambio } from "../Domain/Entities/SolicitudTipoCambio";
import { TipoCambio } from "../Domain/Entities/TipoCambio";
import { SolicitudTipoCambioRepository } from "../Domain/SolicitudTipoCambioRepository";
import { MongoDbConnect } from "src/Context/Shared/Infrastructure/MongoDbConnect";
import { Uuid } from "src/Context/Shared/Domain/ValueObject/Uuid";
import { Moneda } from "../Domain/Properties/Moneda";

@Injectable()
export class MongoDbSolicitudTipoCambioRepositoryImp implements SolicitudTipoCambioRepository{

    async generarSolicitudCambio(data: SolicitudTipoCambio): Promise<void> {
        const connect = await MongoDbConnect.conectarBD();
        const collection = connect.collection("solicitudes")
        await collection.insertOne(data.toPrimitives());
    }

    async obtenerHistorial(data:FiltroHistorialSolicitudes): Promise<ItemSolicitudTipoCambio[]> {
        const connect = await MongoDbConnect.conectarBD();
        const collection = connect.collection("solicitudes")
        const docs = await collection.find({}).toArray();
        console.log(docs);
        
        return docs.map(v=>{
            return ItemSolicitudTipoCambio.create({
                id:v.id,
                monedaOrigen:v.monedaOrigen,
                monedaDestino:v.monedaDestino,
                monto:v.monto,
                montoCambiado:v.montoCambiado,
                tipoCambio:v.tipoCambio,
                fecha:v.fecha,
            })
        })
    }

    async guardarCambio(data: TipoCambio): Promise<void> {
        const connect = await MongoDbConnect.conectarBD();
        const collection = connect.collection("tipo_cambio")
        await collection.insertOne(data.toPrimitives());
    }

    async obtenerTipoCambioDollar():Promise<Moneda>{
        const connect = await MongoDbConnect.conectarBD();
        const collection = connect.collection("tipo_cambio")
        const ultimoRegistro = await collection.findOne({}, { sort: { fecha: -1 } });
        console.log(ultimoRegistro);
        return new Moneda(ultimoRegistro.compra);
        
    }
}