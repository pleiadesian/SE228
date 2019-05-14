package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.dao.OrderMapper;
import wzl.ebook.model.Order;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderMapper orderMapper;

    @RequestMapping(value = "/order", method = RequestMethod.GET)
    public List<Order> findAllOrder() {
        return orderMapper.selectAll();
    }
}
