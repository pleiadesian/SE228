drop table if exists orderitem;
drop table if exists orders;
drop table if exists users;
drop table if exists book;
create table book
	(id int not null auto_increment,
     name varchar(20),
	 enabled boolean,
     img varchar(20),
     price numeric(5,2),
     isbn varchar(15),
     storage numeric(3,0),
     author varchar(30),
     area varchar(5),
     press varchar(20),
     time varchar(20),
	 primary key (id)
	);
    
create table users
	(id int auto_increment,
     username varchar(20),
     password varchar(20),
     usertype varchar(10),
     disabled tinyint(1),
	 mail varchar(100),
	 primary key (id)
	);
    
create table orders
	(id int auto_increment,
     money numeric(8,2),
	 user_id int,
     ordertime varchar(20),
	 primary key (id),
	 foreign key (user_id) references users(id)
	);
    
create table orderitem
	(order_id int,
	 book_id int,
     num int,
	 primary key (order_id,book_id),
	 foreign key (order_id) references orders(id),
	 foreign key (book_id) references book(id)
	);

insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("算法导论" ,1,"./img/book0.jpg",102.40,
	"9787111407010",10,"Thomas H.Cormen","美国","机械工业出版社","2013年1月");
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("计算机网络" ,1,"./img/book1.jpg",90.18,
	"9787111599715",15,"James F.Kurose,Keith W.Ross","美国","机械工业出版社","2014年10月");
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("计算机科学导论" ,1,"./img/book2.jpg",95.22,
	"9787111511632",32,"Behrouz A. Forouzan","美国","机械工业出版社","2016年8月");
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("数据库系统概念" ,1,"./img/book3.jpg",92.36,
	"9787111400851",51,"西尔伯沙茨,Henry F.Korth","美国","机械工业出版社","2013年1月");
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("Java编程思想" ,1,"./img/book4.jpg",100.50,
	"9787111213826",26,"埃克尔","美国","机械工业出版社","2013年5月");
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("代码大全" ,1,"./img/book5.jpg",128.00,
	"9787121022982",27,"迈克康奈尔","美国","电子工业出版社","2011年9月"); 
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("Java程序员修炼之道" ,1,"./img/book6.jpg",89.00,
	"9787115321954",97,"埃文斯","荷兰","人民邮电出版社","2013年8月"); 
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("计算机程序的构造和解释" ,1,"./img/book7.jpg",45.00,
	"9787111135104",139,"裘宗燕","中国","机械工业出版社","2004年2月"); 
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("C程序设计语言" ,1,"./img/book8.jpg",30.00,
	" 9787111128069",10,"BRIAN W KERN","美国","机械工业出版社","2005年4月"); 
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("算法导论" ,1,"./img/book9.jpg",128.00,
	" 9787111407010",54,"Thomas H.Cormen","美国","机械工业出版社","2005年4月"); 
insert into book (name,enabled,img,price,isbn,storage,author,area,press,time) values("重构：改善既有代码的设计" ,1,"./img/book10.jpg",168.00,
	" 9787115508645",10,"马丁.福勒","美国","人民邮电出版社","2005年4月"); 

insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("aaa","111","user",0,"","男","上海市闵行区上海交通大学东19宿舍","1301000200");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("bbb","111","user",1,"","男","209W 118th St #2G New York, NY 10026. USA","+001 162 6216807");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("frank","123","user",0,"","男","1541 avenue Marcel Merieux,69280 MARCY L·ETOILE,France","+33 0646370491");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("tiao","114","user",0,"","女","重庆市沙坪坝区沙正街174号","17246850671");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("angel","199","user",0,"","女","海南省海口市琼山区国兴大道文坛路6号","15869168200");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("jane","290","user",0,"","女","拉萨市城关区宇拓路28号","13369268298");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("adam","290","user",0,"","男","386 Kings Road,SW3 5UZ,UK","+44 07425900580");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("mix","224","user",0,"","男","Lennon Studios, 109 Cambridge Court, Liverpool, L7 7AG, UK","+44 07425900580");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("kick","360","user",0,"","男"," Unit 12,Anton Business Park,Andover,Hampshire,SP10 2NQ.,UK","+44 0125800500");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("july","440","admin",0,"","女"," 68 New Dover Road,Canterbury,Kent,CT1 3LQ,UK","+44 3125125803");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("rose","330","user",0,"","女"," No.235,Kai Xuan Down Road, Chuan Shan District, Sui Ning, SiChuan Province, China","17681839900");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("ann","770","user",0,"","女"," Leonce Cuisset Et Fils 24240 Monestier France","+33 08291038");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("moow","444","user",0,"","男","17, rue du Chemin Vert 77135 Pontcarré,France","+33 10988602");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("jack","245","user",0,"","男","Hillhouse International, Thorton Cleveleys, Lancashire, FY5 4QD, England","+44 8008208820");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("tim","133","user",0,"","男","’t Holweg 10, 7924 PX Veeningen, The Netherlands","+0031 612345678");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("lily","222","user",0,"","女","Vicolo Tommaso Albinoni 11, Montegrotto Terme ,Padova, Italia","+0039 2765681210");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("kookon","333","user",0,"","男","East Port, Vrangel, Primorsky Kray, Russia","+007 49565681210");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("john","211","admin",0,"","男","5/6 Blyth,ST. Altona VIC,Australia","+61 41234 6778");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("alex","998","admin",0,"","男","5/6 Blyth,ST. Altona VIC,Australia ","+61 43234 8778");
insert into users (username,password,usertype,disabled,mail,gender,address,telephone) values("lulu","200","admin",0,"","女","4 Coogee Avenue,The Entrance North,NSW 2261,Australia","+61 72334 8770");

insert into orders (money,user_id,ordertime) values(102.40,1,"2019-3-1");
insert into orders (money,user_id,ordertime) values(200.10,1,"2019-2-1");
insert into orders (money,user_id,ordertime) values(267.00,1,"2019-1-1");


insert into orderitem values(1,1,1);
insert into orderitem values(2,4,2);
insert into orderitem values(3,6,3);
