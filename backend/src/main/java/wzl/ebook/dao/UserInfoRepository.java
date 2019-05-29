package wzl.ebook.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import wzl.ebook.entity.UserInfo;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {

}
