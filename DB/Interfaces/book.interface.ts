import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

export interface Book extends Document{

    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly name: string,
    readonly Author: object,
    readonly language: string,
    readonly realeaseYear: Number,
    readonly publisher: string,
    readonly pages: Number,

}