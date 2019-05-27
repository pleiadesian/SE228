package wzl.ebook.service;

import wzl.ebook.entity.CartItem;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface CartService {

    List<CartItem> findCart(HttpServletRequest request, int userId);

    List<CartItem> addCartItem(HttpServletRequest request, int userId, int bookId, int quantity);

    List<CartItem> handleDeleteCartItem(HttpServletRequest request, int userId, int bookId);

    List<CartItem> handleSubmitCart(HttpServletRequest request, int userId);
}
