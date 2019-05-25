package wzl.ebook.service;

import com.alibaba.fastjson.JSONObject;
import wzl.ebook.entity.User;

public interface UserService {

    JSONObject findCurrUser();

    void deleteCurrUser();

    User handleLogin(String username, String password);

    boolean handleRegister(String username, String password, String mail);
}
