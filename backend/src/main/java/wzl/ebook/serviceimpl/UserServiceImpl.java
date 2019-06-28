package wzl.ebook.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import wzl.ebook.dao.UserInfoRepository;
import wzl.ebook.dao.UserMapper;
import wzl.ebook.entity.User;
import wzl.ebook.entity.UserInfo;
import wzl.ebook.service.UserService;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    GridFsTemplate gridFsTemplate;

    @Autowired
    GridFSBucket gridFSBucket;

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
    public String geneAuthcode(String mail) {
        HtmlEmail email = new HtmlEmail();
        int code = (int) (Math.random()*9000+1000);
        email.setHostName("smtp.qq.com");
        email.setCharset("utf-8");
        try {
            email.addTo(mail);
            email.setFrom("574402791@qq.com", "e-book");
            email.setAuthentication("574402791@qq.com", "xjgewwvphtjibfib");
            email.setSubject("欢迎注册e-book");
            email.setMsg("您的验证码是："+code);
            email.send();
            return String.valueOf(code);
        }catch (Exception e) {
            e.printStackTrace();
            return "";
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

    @Override
    public void saveUserInfo(int id, String address, String gender, String telephone) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(id);
        userInfo.setAddress(address);
        userInfo.setGender(gender);
        userInfo.setTelephone(telephone);
        userInfo.setImg("img/user/avatar.jpg");

        userInfoRepository.save(userInfo);
    }

    @Override
    public UserInfo getUserInfo(int id) {
        UserInfo userInfo = userInfoRepository.findById(id);
        return userInfo;
    }

    @Override
    public void saveUserAvatar(MultipartFile file, int userId) {
        String filename = "UID_" + String.valueOf(userId);
        try {
            InputStream inputStream = file.getInputStream();

            Query query = Query.query(Criteria.where("filename").is(filename));
            gridFsTemplate.delete(query);

            gridFsTemplate.store(inputStream, filename);
        }catch(Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public BufferedImage getUserAvatar(int userId) {
        String filename = "UID_" + userId;
        Query query = Query.query(Criteria.where("filename").is(filename));
        GridFSFile file = gridFsTemplate.findOne(query);
        if (file == null) {
            return null;
        }
        GridFsResource cover = new GridFsResource(file, gridFSBucket.openDownloadStream(file.getObjectId()));

        try {
            InputStream inputStream = cover.getInputStream();
            return ImageIO.read(inputStream);
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
