package wzl.ebook.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.model.Cart;
import wzl.ebook.model.CartItem;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class CartController {

    @RequestMapping(value = "/getCart", method = RequestMethod.GET)
    public List<CartItem> findCart(HttpServletRequest request, @RequestParam("userid") int userId) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));
        if(cart == null) {
            return null;
        }else {
            return cart.getItemList();
        }
    }

    @RequestMapping(value = "/addCart", method = RequestMethod.GET)
    public List<CartItem> addCart(HttpServletRequest request, @RequestParam(value = "userid") int userId,
                                  @RequestParam(value = "bookId") int bookId,
                                  @RequestParam(value = "quantity") int quantity) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));

        // Create new cart with userid in the session when cart does not exist
        if (cart == null) {
            cart = new Cart();
            cart.setUserid(userId);
            request.getSession().setAttribute(String.valueOf(userId), cart);
        }
        cart.addItem(bookId, quantity);

        return cart.getItemList();
    }

    @RequestMapping(value = "/deleteCart", method = RequestMethod.GET)
    public List<CartItem> deleteCart(HttpServletRequest request, @RequestParam(value = "userid") int userId,
                                  @RequestParam(value = "bookId") int bookId) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));
        if (cart == null) {
            return null;
        }
        cart.deleteItem(bookId);

        return cart.getItemList();
    }

    @RequestMapping(value = "/deleteCart", method = RequestMethod.GET)
    public List<CartItem> deleteCart(HttpServletRequest request, @RequestParam(value = "userid") int userId) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));
        if (cart == null) {
            return null;
        }

        // update to database
        if (!cart.submitCart())
            return null;
        else {
            return cart.getItemList();
        }
    }
}
