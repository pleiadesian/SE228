package wzl.ebook.entity;

public class Orderitem {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orderitem.order_id
     *
     * @mbg.generated
     */
    //private Integer orderId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orderitem.book_id
     *
     * @mbg.generated
     */
    private Integer bookId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orderitem.num
     *
     * @mbg.generated
     */
    private Integer num;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orderitem.order_id
     *
     * @return the value of orderitem.order_id
     *
     * @mbg.generated
     */
    /*public Integer getOrderId() {
        return orderId;
    }*/

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orderitem.order_id
     *
     * @param orderId the value for orderitem.order_id
     *
     * @mbg.generated
     */
    /*public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }*/

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orderitem.book_id
     *
     * @return the value of orderitem.book_id
     *
     * @mbg.generated
     */
    public Integer getBookId() {
        return bookId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orderitem.book_id
     *
     * @param bookId the value for orderitem.book_id
     *
     * @mbg.generated
     */
    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orderitem.num
     *
     * @return the value of orderitem.num
     *
     * @mbg.generated
     */
    public Integer getNum() {
        return num;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orderitem.num
     *
     * @param num the value for orderitem.num
     *
     * @mbg.generated
     */
    public void setNum(Integer num) {
        this.num = num;
    }
}