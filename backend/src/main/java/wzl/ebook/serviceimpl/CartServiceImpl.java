package wzl.ebook.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.dao.OrderMapper;
import wzl.ebook.model.Cart;
import wzl.ebook.model.CartItem;
import wzl.ebook.service.CartService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private BookMapper bookMapper;

    @Override
    public List<CartItem> findCart(HttpServletRequest request, int userId) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));
        if(cart == null) {
            return null;
        }else {
            return cart.getItemList();
        }
    }

    @Override
    public List<CartItem> addCartItem(HttpServletRequest request, int userId, int bookId, int quantity) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));

        // Create new cart with userid in the session when cart does not exist
        if (cart == null) {
            cart = new Cart();
            cart.setUserid(userId);
            request.getSession().setAttribute(String.valueOf(userId), cart);
        }
        cart.addItem(bookMapper, bookId, quantity);

        return cart.getItemList();
    }

    @Override
    public List<CartItem> handleDeleteCartItem(HttpServletRequest request, int userId, int bookId) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));
        if (cart == null) {
            return null;
        }
        cart.deleteItem(bookId);

        return cart.getItemList();
    }

    @Override
    public List<CartItem> handleSubmitCart(HttpServletRequest request, int userId) {
        Cart cart = (Cart) request.getSession().getAttribute(String.valueOf(userId));
        if (cart == null) {
            return null;
        }

        // update to database
        if (!cart.submitCart(bookMapper, orderMapper))
            return null;
        else {
            return cart.getItemList();
        }
    }
}
