package wzl.ebook.entity;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

public class Order {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.id
     *
     * @mbg.generated
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.money
     *
     * @mbg.generated
     */
    private BigDecimal money;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.user_id
     *
     * @mbg.generated
     */
    private Integer userId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.ordertime
     *
     * @mbg.generated
     */
    private String ordertime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.ordertime
     *
     * @mbg.generated
     */
    private List<Orderitem> orderitems = new LinkedList<Orderitem>();

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.id
     *
     * @return the value of orders.id
     *
     * @mbg.generated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.id
     *
     * @param id the value for orders.id
     *
     * @mbg.generated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.money
     *
     * @return the value of orders.money
     *
     * @mbg.generated
     */
    public BigDecimal getMoney() {
        return money;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.money
     *
     * @param money the value for orders.money
     *
     * @mbg.generated
     */
    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.user_id
     *
     * @return the value of orders.user_id
     *
     * @mbg.generated
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.user_id
     *
     * @param userId the value for orders.user_id
     *
     * @mbg.generated
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.ordertime
     *
     * @return the value of orders.ordertime
     *
     * @mbg.generated
     */
    public String getOrdertime() {
        return ordertime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.ordertime
     *
     * @param ordertime the value for orders.ordertime
     *
     * @mbg.generated
     */
    public void setOrdertime(String ordertime) {
        this.ordertime = ordertime == null ? null : ordertime.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.ordertime
     *
     * @return the value of orders.orderitems
     *
     * @mbg.generated
     */
    public List<Orderitem> getOrderitems() {
        return orderitems;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.ordertime
     *
     *
     * @mbg.generated
     */
    public void setOrderitems() {
        this.orderitems = orderitems;
    }

    public void insertOrderitems(Orderitem orderitem) {
        Orderitem newOrderitem = orderitem;
        orderitems.add(newOrderitem);
    }
}