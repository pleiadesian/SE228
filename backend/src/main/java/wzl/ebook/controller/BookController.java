package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.model.Book;

import java.math.BigDecimal;
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

    @RequestMapping(value = "/deleteBook", method = RequestMethod.GET)
    public List<Book> deleteOneBook(@RequestParam("bookId") int bookId) {
        try{
            Book newBook = bookMapper.selectByPrimaryKey(bookId);
            newBook.setEnabled(false);
            bookMapper.updateByPrimaryKey(newBook);
            return bookMapper.selectAll();
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/changeBookInfo", method = RequestMethod.GET)
    public List<Book> changeOneBook(@RequestParam("bookId") int bookId, @RequestParam("attrName") String attrName,
                                    @RequestParam("newValue") String newValue) {
        try {
            Book newBook = bookMapper.selectByPrimaryKey(bookId);
            // check input type
            if (attrName.equals("name")) {
                newBook.setName(newValue);
            }else if(attrName.equals("storage")){
                newBook.setStorage(Short.valueOf(newValue));
            }else if(attrName.equals("author")){
                newBook.setAuthor(newValue);
            }else if(attrName.equals("price")){
                newBook.setPrice(BigDecimal.valueOf(Double.valueOf(newValue)));
            }else if(attrName.equals("isbn")){
                newBook.setIsbn(newValue);
            }
            bookMapper.updateByPrimaryKey(newBook);
            return bookMapper.selectAll();
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
