package wzl.ebook.model;

import org.springframework.beans.factory.annotation.Autowired;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.dao.OrderMapper;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

public class Cart {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private BookMapper bookMapper;

    private List<CartItem> itemList = new LinkedList();
    private int userId;

    public double getPrice() {
        double totalPrice = 0;
        for (CartItem item : itemList) {
            totalPrice += item.getPrice();
        }
        return totalPrice;
    }

    public List<CartItem> getItemList() {
        return itemList;
    }

    public void setUserid(int userid) {
        this.userId = userid;
    }

    public int getUserid() {
        return userId;
    }

    public boolean submitCart() {
        // Get date for the new order
        Calendar cal = Calendar.getInstance();
        String date = String.valueOf(cal.get(Calendar.YEAR))+"-"+String.valueOf(cal.get(Calendar.MONTH)+1)+"-"
                +String.valueOf(cal.get(Calendar.DATE));

        // Get total price of the cart
        double totPrice = 0.0;
        for (CartItem item : itemList) {
            totPrice += item.getPrice();
        }

        // Insert an order
        Order newOrder = new Order();
        newOrder.setMoney(BigDecimal.valueOf(totPrice));
        newOrder.setOrdertime(date);
        newOrder.setUserId(userId);


        for (CartItem item : itemList) {
            int bookId = item.getBook().getId();
            int quantity = item.getQuantity();
            Book bookItem = bookMapper.selectByPrimaryKey(bookId);

            int tempStorage = bookItem.getStorage() - quantity;

            // Storage is not enough?
            if (tempStorage < 0 ){
                return false;
            }

            // Update new storage in the database
            bookItem.setStorage((short) tempStorage);
            bookMapper.updateByPrimaryKey(bookItem);

            // Add orderitem to database
            Orderitem newOrderitem = new Orderitem();
            newOrderitem.setBookId(bookId);
            newOrderitem.setNum(quantity);
            newOrder.insertOrderitems(newOrderitem);
        }

        // 改变xml 插入new orderitem
        orderMapper.insert(newOrder);
        return true;
    }

    public void deleteItem(int bookId){
        for (CartItem item : itemList) {
            if (item.getBook().getId() == bookId) {
                itemList.remove(item);
                return;
            }
        }
    }

    public void addItem(int bookId, int quantity) {
        Book bookItem = bookMapper.selectByPrimaryKey(bookId);

        if (bookItem == null)
            return;

        // Increase quantity if the book already exists in cart
        for (CartItem item : itemList) {
            if (item.getBook().getId().equals(bookItem.getId())) {
                item.setQuantity(item.getQuantity()+quantity);
                return;
            }
        }

        // Add a new book
        CartItem cartItem = new CartItem();
        cartItem.setBook(bookItem);
        cartItem.setQuantity(quantity);
        itemList.add(cartItem);
    }
}
