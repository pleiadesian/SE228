package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import wzl.ebook.entity.Book;
import wzl.ebook.service.BookService;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
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

    @RequestMapping(value = "/changeBookInfo", method = RequestMethod.POST)
    public List<Book> changeBookInfo(@RequestParam("booklist") String bookStr) {
        System.out.println("updateing book list...");
        return bookService.updateBookList(bookStr);
    }

    // Get new book info as json string from front end, return new book list
    @RequestMapping(value = "/addBook", method = RequestMethod.POST)
    public List<Book> addBook(@RequestParam("bookInfo") String bookStr) {
        System.out.println("updateing book list...");
        return bookService.addOneBook(bookStr);
    }

    @RequestMapping(value = "/saveBookCover", method = RequestMethod.POST)
    public void saveCover(HttpServletRequest request, @RequestParam("avatar") MultipartFile file) {
        int bookId = Integer.valueOf(request.getParameter("bookId"));
        bookService.saveBookCover(file, bookId);
    }

    @RequestMapping(value = "/getBookCover", method = RequestMethod.GET)
    public void getCover(HttpServletResponse response, @RequestParam("bookId") int bookId) {
        try {
            BufferedImage image = bookService.getBookCover(bookId);
            ImageIO.write(image, "JPG", response.getOutputStream());
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
}
