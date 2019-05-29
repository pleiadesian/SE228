package wzl.ebook.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class UserInfo {
    @Id
    private int id;

    private String address;
    private String gender;
    private String telephone;
    private String img;
    
    public String getAddress(){
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getGender(){
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getTelephone(){
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    public String getImg(){
        return img;
    }
    public void setImg(String img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "id="+id+
                ", address='"+address+'\''+
                ", gender='"+gender+'\''+
                ", telephone='"+telephone+'\''+
                ", img='"+img+'\''+
                '}';
    }
}
