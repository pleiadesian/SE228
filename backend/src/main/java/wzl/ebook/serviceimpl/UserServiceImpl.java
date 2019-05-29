package wzl.ebook.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wzl.ebook.dao.UserMapper;
import wzl.ebook.entity.User;
import wzl.ebook.service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User handleLogin(String username, String password) {
        User user = userMapper.selectByUsername(username);

        if (user == null) return null;

        if (password.equals(user.getPassword())) {
            return user;
        }
        return null;
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
        try {
            userMapper.insert(newUser);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<User> findAllUser() {
        try {
            return userMapper.selectAll();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<User> changeUserAuth(int id, boolean auth) {
        User user = userMapper.selectByPrimaryKey(id);

        // Frontend user list is dirty, change it with new list
        if (user == null) return userMapper.selectAll();

        // Admin can't change admin's auth
        if (user.getUsertype().equals("admin")) return null;

        user.setDisabled(auth);

        userMapper.updateByPrimaryKey(user);
        return userMapper.selectAll();
    }
}
