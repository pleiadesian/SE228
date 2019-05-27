package wzl.ebook.service;

import wzl.ebook.entity.Book;

import java.util.List;

public interface BookService {

    List<Book> findAllBook();

    Book findOneBook(int id);

    List<Book> deleteOneBook(int id);

    List<Book> updateBookList(String bookStr);

    List<Book> addOneBook(String bookStr);
}
