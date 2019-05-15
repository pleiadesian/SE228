package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wzl.ebook.dao.UserMapper;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import wzl.ebook.model.User;
import wzl.ebook.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // 获取当前登录的用户信息
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public JSONObject getLoginInfo() {
        System.out.println("Searching user info...");
        return userService.findCurrUser();  // 返回包含用户信息、登录信息、用户名的json对象
    }

    // 用户退出，删除信息
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout() {
        System.out.println("Clearing user info...");
        userService.deleteCurrUser();
    }

    // 用户登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public User login(@RequestParam("username") String username, @RequestParam("password") String password) {
        System.out.println("Checking user info...");
        return userService.handleLogin(username, password);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public boolean doRegister(@RequestParam("username") String username, @RequestParam("password") String password,
                              @RequestParam("mail") String mail) {
        System.out.println("Registering...");
        return userService.handleRegister(username, password, mail);
    }
}
