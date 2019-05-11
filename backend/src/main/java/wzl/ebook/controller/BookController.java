package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.model.Book;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookMapper bookMapper;

    @RequestMapping(value = "/booklist", method = RequestMethod.GET)
    public List<Book> findAllBook() {
        return bookMapper.selectAll();
    }

    @RequestMapping(value = "/onebook", method = RequestMethod.GET)
    public Book findOneBook(@RequestParam("bookId") int id) {
        return bookMapper.selectByPrimaryKey(id);
    }
}
