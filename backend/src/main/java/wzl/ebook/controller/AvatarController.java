package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import wzl.ebook.service.BookService;
import wzl.ebook.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AvatarController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/saveAvatar", method = RequestMethod.POST)
    public void saveAvatar(HttpServletRequest request, @RequestParam("avatar") MultipartFile file) {
        System.out.println("Saving image...");
        int bookId = Integer.valueOf(request.getParameter("bookId"));
        if (bookId > 0) {
            bookService.saveBookCover(file, bookId);
        }else {
            int userId = Integer.valueOf(request.getParameter("userId"));
            userService.saveUserAvatar(file, userId);
        }
    }
}
