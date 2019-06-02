package wzl.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import wzl.ebook.entity.User;
import wzl.ebook.entity.UserInfo;
import wzl.ebook.service.UserService;

import javax.servlet.http.HttpServletRequest;
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

    @RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
    public UserInfo getUserInfo(@RequestParam("userId") int userId) {
       return userService.getUserInfo(userId);
    }

    @RequestMapping(value = "/saveUserInfo", method = RequestMethod.GET)
    public void saveUserInfo(@RequestParam("userId") int userId,@RequestParam("address") String address,
                             @RequestParam("gender") String gender,@RequestParam("telephone") String telephone) {
        userService.saveUserInfo(userId, address, gender, telephone);
    }

}
