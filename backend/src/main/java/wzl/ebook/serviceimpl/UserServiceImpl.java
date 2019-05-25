package wzl.ebook.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wzl.ebook.dao.UserMapper;
import wzl.ebook.entity.User;
import wzl.ebook.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    // (多用户登录时如何处理)
    private static String currUsername = "";
    private static boolean currLogin = false;
    private static User currUser;

    @Autowired
    private UserMapper userMapper;

    @Override
    public JSONObject findCurrUser() {
        String user =  JSON.toJSONString(currUser);
        String jsonStr = "{\"username\":\""+currUsername+"\",\"login\":"+currLogin+",\"userInfo\":"+ user +"}";
        JSONObject userInfo = JSON.parseObject(jsonStr);
        return userInfo;
    }

    @Override
    public void deleteCurrUser() {
        currUsername = "";
        currLogin = false;
    }

    @Override
    public User handleLogin(String username, String password) {
        Boolean isValid = checkLogin(username, password);
        checkLogin(username, password);

        if(isValid) {
            return currUser;
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

    @Override
    public boolean handleRegister(String username, String password, String mail) {
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
