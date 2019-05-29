package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import wzl.ebook.entity.User;
import wzl.ebook.entity.UserInfo;
import wzl.ebook.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MongoOperations mongoOperations;


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

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<User> getUserTable() {
        System.out.println("Searching user info...");
        return userService.findAllUser();
    }

    @RequestMapping(value = "/userForbid", method = RequestMethod.GET)
    public List<User> forbidUser(@RequestParam("userId") int userId) {
        System.out.println("Searching for user...");
        return userService.changeUserAuth(userId, true);
    }

    @RequestMapping(value = "/userFree", method = RequestMethod.GET)
    public List<User> freeUser(@RequestParam("userId") int userId) {
        System.out.println("Searching for user...");
        return userService.changeUserAuth(userId, false);
    }

    @RequestMapping(value = "/userInfo", method = RequestMethod.GET)
    public UserInfo getUserInfo() {
        UserInfo userInfo = new UserInfo();
        userInfo.setAddress("1");
        userInfo.setGender("2");
        userInfo.setImg("3");
        userInfo.setTelephone("4");
        mongoOperations.save(userInfo, "users");
        Query query = new Query(Criteria.where("Address").is("1"));
        UserInfo userGetFromMdb = mongoOperations.findOne(query, UserInfo.class, "users");
        System.out.println(userGetFromMdb.getGender());
        return userGetFromMdb;
    }
}
