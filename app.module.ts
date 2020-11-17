import { BooksService } from './Services/books.service';
import { BooksController } from './Controllers/books.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookRepository } from './DB/Repository/book.repository';
import { BookSchema } from './DB/Schemas/book.schema';


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true }),
    MongooseModule.forRoot("mongodb+srv://root:UhIsrB9ewHJkTuJZ@cluster0.qax5j.mongodb.net/biblioteca?retryWrites=true&w=majority"),
    MongooseModule.forFeature([
      { name: 'book', schema: BookSchema },
    ])
  ],
  controllers: [
    BooksController,],
  providers: [
    BooksService, BookRepository],
})
export class AppModule { }
