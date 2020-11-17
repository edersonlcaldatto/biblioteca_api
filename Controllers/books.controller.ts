import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from 'src/DB/Interfaces/book.interface';
import { BookDTO } from 'src/DTO/books.dto';
import { BooksService } from 'src/Services/books.service';

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookeService: BooksService
    ) { }

    @Get()
    async getAllBooks(): Promise<Book[]> {        
        return await this.bookeService.getAllBooks();

    }

    @Get('author/:authorName')
    async getBookByAuthorName(@Param('authorName') authorName: string) : Promise<Book[]> {
         console.log('getBookByAuthorName ' + authorName);
        return await this.bookeService.getBookByAuthorName(authorName);
    }    

    @Get(':id')
    async getBookById(@Param() params) : Promise<Book> {
        // console.log('getBookById ' + params.id);
        return await this.bookeService.getById(params.id);
    }
    
    @Post()
    async saveBook(@Body() newBook: BookDTO): Promise<Book> {
        return await this.bookeService.saveBook(newBook);
    }

    @Put(':id')
    async updateBookById(@Param() params, @Body() newBook: BookDTO): Promise<Book>{
        return await this.bookeService.updateBookById(params.id, newBook);
    }  

    @Delete(':id')
    async deleteBookById(@Param() params ): Promise<Book> {
        return await this.bookeService.deleteBookById(params.id);
    }

}
