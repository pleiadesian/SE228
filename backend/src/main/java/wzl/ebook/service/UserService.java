package wzl.ebook.service;

import com.alibaba.fastjson.JSONObject;
import wzl.ebook.entity.User;

import java.util.List;

public interface UserService {

    User handleLogin(String username, String password);

    boolean handleRegister(String username, String password, String mail);

    List<User> findAllUser();
}
