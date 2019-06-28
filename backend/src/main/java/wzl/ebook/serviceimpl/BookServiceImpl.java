package wzl.ebook.serviceimpl;


import com.alibaba.fastjson.JSON;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.entity.Book;
import wzl.ebook.entity.UserInfo;
import wzl.ebook.service.BookService;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    GridFsTemplate gridFsTemplate;

    @Autowired
    GridFSBucket gridFSBucket;

    @Override
    public List<Book> findAllBook() {
        return bookMapper.selectAll();
    }

    @Override
    public Book findOneBook(int id) {
        return bookMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Book> deleteOneBook(int id) {
        try {
            Book newBook = bookMapper.selectByPrimaryKey(id);
            newBook.setEnabled(false);
            bookMapper.updateByPrimaryKey(newBook);
            return bookMapper.selectAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Book> updateBookList(String bookStr) {
        try {
            List<Book> oldList = bookMapper.selectAll();
            List<Book> newList = new LinkedList<>();
            List<Book> pendingList = JSON.parseArray(bookStr, Book.class);

            // match books between old and new list and update some attr
            for (Book oldBook : oldList) {
                for (Book newBook : pendingList) {
                    if (oldBook.getId().equals(newBook.getId())) {
                        if (!oldBook.getStorage().equals(newBook.getStorage())) {
                            oldBook.setStorage(newBook.getStorage());
                        } else if (!(oldBook.getPrice().doubleValue() == newBook.getPrice().doubleValue())) {
                            oldBook.setPrice(newBook.getPrice());
                        } else if (!oldBook.getName().equals(newBook.getName())) {
                            oldBook.setName(newBook.getName());
                        } else if (!oldBook.getAuthor().equals(newBook.getAuthor())) {
                            oldBook.setAuthor(newBook.getAuthor());
                        } else if (!oldBook.getIsbn().equals(newBook.getIsbn())) {
                            oldBook.setIsbn(newBook.getIsbn());
                        } else {
                            continue;
                        }
                        // if some attr changes, add to new list
                        newList.add(oldBook);
                    }
                }
            }
            for (Book newBook : newList) {
                bookMapper.updateByPrimaryKey(newBook);
            }
            return bookMapper.selectAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Book> addOneBook(String bookStr) {
        try {
            Book newBook = JSON.parseObject(bookStr, Book.class);

            // check if value is legal
            if (newBook.getPrice().doubleValue() < 0.0 || newBook.getStorage() < 0 || newBook.getName().equals("")){
                return null;
            }

            newBook.setEnabled(true);  // enable new book
            bookMapper.insert(newBook);
            return bookMapper.selectAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void saveBookCover(MultipartFile file, int bookId) {
        String filename = "BID_" + bookId;
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
    public BufferedImage getBookCover(int bookId) {
        String filename = "ID_" + bookId;
        return getBufferedImage(filename, gridFsTemplate, gridFSBucket);
    }

    static BufferedImage getBufferedImage(String filename, GridFsTemplate gridFsTemplate, GridFSBucket gridFSBucket) {
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
