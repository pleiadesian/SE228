package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.entity.CartItem;
import wzl.ebook.service.CartService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/getCart", method = RequestMethod.GET)
    public List<CartItem> getCart(HttpServletRequest request, @RequestParam("userid") int userId) {
        System.out.println("Searching cart...");
        return cartService.findCart(request, userId);
    }

    @RequestMapping(value = "/addCart", method = RequestMethod.GET)
    public List<CartItem> addCart(HttpServletRequest request, @RequestParam(value = "userid") int userId,
                                  @RequestParam(value = "bookId") int bookId,
                                  @RequestParam(value = "quantity") int quantity) {
        System.out.println("Adding to cart...");
        return cartService.addCartItem(request, userId, bookId, quantity);
    }

    @RequestMapping(value = "/deleteCart", method = RequestMethod.GET)
    public List<CartItem> deleteCart(HttpServletRequest request, @RequestParam(value = "userid") int userId,
                                  @RequestParam(value = "bookId") int bookId) {
        System.out.println("Delete cart item...");
        return cartService.handleDeleteCartItem(request, userId, bookId);
    }

    @RequestMapping(value = "/submitCart", method = RequestMethod.GET)
    public List<CartItem> submitCart(HttpServletRequest request, @RequestParam(value = "userid") int userId) {
        System.out.println("Submitting cart...");
        return cartService.handleSubmitCart(request, userId);
    }
}
