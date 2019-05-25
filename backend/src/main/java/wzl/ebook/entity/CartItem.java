package wzl.ebook.entity;

public class CartItem {

    private Book book;
    private int quantity;

    public Book getBook() { return book; }

    public void setBook(Book book) {
        this.book = book;
    }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        double price = book.getPrice().doubleValue() ;
        return price * quantity;
    }
}
