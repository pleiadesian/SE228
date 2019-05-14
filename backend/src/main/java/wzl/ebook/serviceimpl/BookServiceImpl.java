package wzl.ebook.serviceimpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wzl.ebook.dao.BookMapper;
import wzl.ebook.model.Book;
import wzl.ebook.service.BookService;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper bookMapper;

    @Override
    public List<Book> findAllBook(){
        return bookMapper.selectAll();
    }

    @Override
    public Book findOneBook(int id) {
        return bookMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Book> deleteOneBook(int id) {
        try{
            Book newBook = bookMapper.selectByPrimaryKey(id);
            newBook.setEnabled(false);
            bookMapper.updateByPrimaryKey(newBook);
            return bookMapper.selectAll();
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Book> updateBookList(List<Book> booklist) {
        try {
            List<Book> oldList = bookMapper.selectAll();
            List<Book> newList = new LinkedList<>();

            // match books between old and new list and update some attr
            for (Book oldBook : oldList) {
                for (Book newBook : booklist) {
                    if (oldBook.getId().equals(newBook.getId())) {
                        if (!oldBook.getStorage().equals(newBook.getStorage())) {
                            oldBook.setStorage(newBook.getStorage());
                        }else if (!oldBook.getPrice().equals(newBook.getPrice())) {
                            oldBook.setPrice(newBook.getPrice());
                        }else if (!oldBook.getName().equals(newBook.getName())) {
                            oldBook.setName(newBook.getName());
                        }else if (!oldBook.getAuthor().equals(newBook.getAuthor())) {
                            oldBook.setAuthor(newBook.getAuthor());
                        }else if (!oldBook.getIsbn().equals(newBook.getIsbn())) {
                            oldBook.setIsbn(newBook.getIsbn());
                        }
                        newList.add(oldBook);
                    }
                }
            }
            // Book newBook = bookMapper.selectByPrimaryKey(bookId);
            // check input type
            /*
            if (attrName.equals("name")) {
                newBook.setName(newValue);
            }else if(attrName.equals("storage")){
                newBook.setStorage(Short.valueOf(newValue));
            }else if(attrName.equals("author")){
                newBook.setAuthor(newValue);
            }else if(attrName.equals("price")){
                newBook.setPrice(BigDecimal.valueOf(Double.valueOf(newValue)));
            }else if(attrName.equals("isbn")){
                newBook.setIsbn(newValue);
            }*/
            for (Book newBook : newList) {
                bookMapper.updateByPrimaryKey(newBook);
            }
            return bookMapper.selectAll();
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
