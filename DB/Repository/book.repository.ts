import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { BookDTO } from "src/DTO/books.dto";
import { Book } from "../Interfaces/book.interface";

@Injectable()
export class BookRepository {

    constructor(@InjectModel('book') private readonly bookModel: Model<Book>) { }

    async saveBook(newBook: BookDTO): Promise<Book> {
        const savedBook = this.bookModel(newBook);
        return await savedBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return await this.bookModel.find(
            {}, // filtros se tiver
            { __v: false } // campos para nao trazer
        ).sort({ name: +1 }).exec();
    }

    async getBookByAuthorName(authorName: String[]): Promise<Book[]> {

        return await this.bookModel.find({

            $or: [
                { "author.name": { $in: authorName } },
                { "author.surname": { $in: authorName } }
            ]
        })
    }


    async getById(bookId: String): Promise<Book> {
        return await this.bookModel.findById(
            bookId, { __v: false })
    }

    async deleteBookById(id: string): Promise<Book> {
        return await this.bookModel.deleteOne({ _id: id }).exec();
    }

    async updateBookById(id: string, newBook: BookDTO): Promise<Book> {
        return await this.bookModel.updateOne({ _id: id }, newBook).exec();
    }

}