import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
var ObjectID = require("bson-objectid");

export type ConfigDocument = Config & Document;



@Schema()
export class Config{
    @Prop()
    platform:string;
    @Prop()
    data: mongoose.Schema.Types.Mixed ;
    @Prop()
    status:number;
    @Prop()
    product:mongoose.Schema.Types.ObjectId;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
/*export const ConfigSchema = new mongoose.Schema({
    platform: {type: String, required: true},
    data: {type: Object, required: true},
    status: {type: Number, required: true},
    product:{type: ObjectID, required:true}

});

// const dataSchema = new mongoose.Schema({
//     Inform
//     name:String,
// });

// export interface Config extends mongoose.Document {
    
//         id: string; 
//         Platform: string;
//         data: ;
//         status: number;
//         product: mongoose.ObjectId;     
// }

*/
