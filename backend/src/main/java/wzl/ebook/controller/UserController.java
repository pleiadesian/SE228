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

@RestController
public class UserController {

    // (多用户登录时如何处理)
    private static String currUsername = "";
    private static boolean currLogin = false;
    private static User currUser;

    @Autowired
    private UserMapper userMapper;

    // 获取当前登录的用户信息
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public JSONObject findCurrUser() {
        String user =  JSON.toJSONString(currUser);
        String jsonStr = "{\"username\":\""+currUsername+"\",\"login\":"+currLogin+",\"userInfo\":"+ user +"}";
        JSONObject userInfo = JSON.parseObject(jsonStr);
        return userInfo;
    }

    // 用户退出，删除信息
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void deleteCurrUser() {
        currUsername = "";
        currLogin = false;
    }

    // 用户登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public JSONObject findLogin(@RequestParam("username") String username, @RequestParam("password") String password) {
        Boolean isValid = checkLogin(username, password);
        checkLogin(username, password);

        if(isValid) {
            return (JSON.parseObject(JSON.toJSONString(currUser)));
        }else{
            return null;
        }
    }

    // 在数据库里检查用户名和密码
    private Boolean checkLogin(String username, String password) {
        User user = userMapper.selectByUsername(username);

        if (user == null) return false;

        if (password.equals(user.getPassword())) {
            currUsername = username;
            currLogin = true;
            currUser = user;
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public boolean doRegister(@RequestParam("username") String username, @RequestParam("password") String password,
                              @RequestParam("mail") String mail) {
        return insertUser(username, password, mail);
    }

    private boolean insertUser(String username, String password, String mail) {
        User user = userMapper.selectByUsername(username);

        if (user != null) return false;

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setUsertype("user");
        newUser.setDisabled(false);
        newUser.setMail(mail);
        userMapper.insert(newUser);
        return true;
    }
}
