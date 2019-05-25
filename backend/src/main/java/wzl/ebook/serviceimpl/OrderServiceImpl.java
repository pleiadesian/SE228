package wzl.ebook.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wzl.ebook.dao.OrderMapper;
import wzl.ebook.entity.Order;
import wzl.ebook.service.OrderService;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<Order> findAllOrder() {
        return orderMapper.selectAll();
    }
}
