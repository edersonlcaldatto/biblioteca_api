import { BadRequestException, Injectable } from '@nestjs/common';
import { Book } from 'src/DB/Interfaces/book.interface';
import { BookRepository } from 'src/DB/Repository/book.repository';
import { BookDTO } from 'src/DTO/books.dto';

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository: BookRepository
    ) { }


    async getAllBooks(): Promise<Book[]>{
        return await this.bookRepository.getAllBooks();
    }

    async saveBook(newBook: BookDTO): Promise<Book> {

        return await this.bookRepository.saveBook(newBook);
    }

    async getById(bookId: String): Promise<Book>{
        try {
            return await this.bookRepository.getById(bookId);
            console.log('service.ts' + bookId);
        } catch{
            throw new BadRequestException('Livro não localizado');
        }
    }

    async getBookByAuthorName(authorName: String): Promise<Book[]>{
        try {
            const splitedAuthorName = authorName.split(' ');

            const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName);

            if(!foundBooks.length){
                throw new BadRequestException('Não foi localizado livros para o Author');    
            }

            return foundBooks;

        } catch (error) {
            throw new BadRequestException('Não foi localizado livros para o Author');            
        }

    }

    async deleteBookById(id: string): Promise<Book>{
        try {
            console.log(id);
            return await this.bookRepository.deleteBookById(id)    
        } catch (error) {
            throw new BadRequestException("Livro não localizado.");            
        }        
    }

    async updateBookById(id: string, newBook: BookDTO): Promise<Book>{
        try {
            await this.bookRepository.updateBookById(id, newBook);
            return this.bookRepository.getById(id);
        } catch (e) {
            throw new BadRequestException('livro não localizado');
        }
    }    
}
