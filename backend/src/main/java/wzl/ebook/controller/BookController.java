package wzl.ebook.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.model.Book;
import wzl.ebook.service.BookService;

import java.math.BigDecimal;
import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/booklist", method = RequestMethod.GET)
    public List<Book> booklist() {
        System.out.println("Searching book list...");
        return bookService.findAllBook();
    }

    @RequestMapping(value = "/onebook", method = RequestMethod.GET)
    public Book onebook(@RequestParam("bookId") int id) {
        System.out.println("Searching book " + id);
        return bookService.findOneBook(id);
    }

    @RequestMapping(value = "/deleteBook", method = RequestMethod.GET)
    public List<Book> deleteBook(@RequestParam("bookId") int bookId) {
        System.out.println("Searching book "+bookId+" to delete");
        return bookService.deleteOneBook(bookId);
    }


    // change business logic to implement commit whole book list to avoid error
    @RequestMapping(value = "/changeBookInfo", method = RequestMethod.POST)
    public List<Book> changeBookInfo(@RequestParam("booklist") String bookStr) {
        System.out.println("updateing book list...");
        return bookService.updateBookList(bookStr);
    }
}
