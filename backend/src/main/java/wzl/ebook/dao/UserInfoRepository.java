package wzl.ebook.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import wzl.ebook.entity.UserInfo;

import java.util.List;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {
    @Query("{ 'id' : ?0 }")
    public UserInfo findById(int id);

}
