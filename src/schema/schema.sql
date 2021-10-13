

DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS product_tag;

DROP TABLE IF EXISTS parent_category;
DROP TABLE IF EXISTS child_category;
DROP TABLE IF EXISTS grandchild_category;

DROP TABLE IF EXISTS product_pictures;
DROP TABLE IF EXISTS profile_picture;

DROP TABLE IF EXISTS store_picture;
DROP TABLE IF EXISTS product_review;
DROP TABLE IF EXISTS store_reviews;


DROP TABLE IF EXISTS return;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS jwt;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS offer_notification;
DROP TABLE IF EXISTS order_notification;

DROP TABLE IF EXISTS attachment;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS new_order;

DROP TABLE IF EXISTS stores;

DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS user_file;

DROP TABLE IF EXISTS users;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(250) NOT NULL,
  country_code VARCHAR(10) NOT NULL,
  mobile VARCHAR (15) NOT NULL UNIQUE,
  country VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  google_id VARCHAR(200) UNIQUE,
  facebook_id VARCHAR(200) UNIQUE,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TABLE user_file(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  file text NOT NULL,
  created_at date not null default current_timestamp
);
CREATE TABLE profiles(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  country VARCHAR (250) NOT NULL,
  mobile VARCHAR (15) NOT NULL UNIQUE,
  profile_picture uuid,
  created_at timestamp not null default current_timestamp,
  

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (profile_picture) REFERENCES user_file(id)
);




CREATE TABLE stores(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL UNIQUE,
  store_name VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  address VARCHAR (250) DEFAULT 'Remote',
  mobile VARCHAR (15) NOT NULL UNIQUE,
  caption VARCHAR(250),
  about VARCHAR(250),
  store_picture uuid,
  store_rating REAL NOT NULL DEFAULT '0',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (store_picture) REFERENCES user_file(id)
);


CREATE TABLE product(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL,
  title VARCHAR(250) NOT NULL,
  metaTitle VARCHAR(100),
  sku VARCHAR(100),
  discount BOOLEAN DEFAULT FALSE,
  dicount_rate FLOAT DEFAULT '0',
  price REAL NOT NULL,
  currency VARCHAR(10),
  brand_name VARCHAR(250),
  description text NOT NULL,
  product_rating REAL NOT NULL DEFAULT '0',
  quantity INT NOT NULL DEFAULT '0',
  product_review text NOT NULL,
  status VARCHAR(250) DEFAULT 'Pending',
  created_at timestamp not null default current_timestamp,
  

  FOREIGN KEY (store_id) REFERENCES stores(id)
);
CREATE TABLE product_tag(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  product_id uuid NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE tag(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  tag_id uuid NOT NULL,
  title VARCHAR(75),
  metaTitle VARCHAR(100),
  slug VARCHAR(100),
  content TEXT,
  FOREIGN KEY (tag_id) REFERENCES product_tag(id)
);
CREATE TABLE grandchild_category(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  product_id uuid NOT NULL,
  title VARCHAR(75),
  metaTitle VARCHAR(100),
  content TEXT,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE child_category(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  child_id uuid,
  product_id uuid,
  title VARCHAR(75),
  metaTitle VARCHAR(100),
  content TEXT,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (child_id) REFERENCES grandchild_category(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE parent_category(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  child_id uuid NOT NULL,
  title VARCHAR(75),
  metaTitle VARCHAR(100),
  content TEXT,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (child_id) REFERENCES child_category(id)
);


CREATE TABLE product_pictures(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  product_id uuid NOT NULL,
  product_picture uuid NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (product_picture) REFERENCES user_file(id)
);
CREATE TABLE profile_picture(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  profile_picture uuid NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (profile_picture) REFERENCES user_file(id)
);
CREATE TABLE store_picture(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL,
  store_picture uuid NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (store_picture) REFERENCES user_file(id)
);
CREATE TABLE product_review(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL ,
  product_id uuid NOT NULL ,
  review VARCHAR(250) NOT NULL,
  rate VARCHAR(1) NOT NULL,
  votes VARCHAR(250) DEFAULT '0',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE store_reviews(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL UNIQUE,
  store_id uuid NOT NULL UNIQUE,
  review VARCHAR(250) NOT NULL,
  rate FLOAT NOT NULL DEFAULT '0',
  votes VARCHAR(250) DEFAULT '0',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);


CREATE TABLE new_order(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  status VARCHAR (250) NOT NULL,
  tax FLOAT,
  shipping FLOAT,
  discount FLOAT DEFAULT '0',
  sub_total FLOAT NOT NULL,
  grand_total FLOAT NOT NULL,
  mobile VARCHAR (15) NOT NULL, 
  city VARCHAR (250) NOT NULL,
  country VARCHAR (250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (profile_id) REFERENCES profiles(id)
  );





CREATE TABLE order_item (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  price FLOAT NOT NULL,
  discount FLOAT DEFAULT '0',
  quantity VARCHAR(6) DEFAULT '1',
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (order_id) REFERENCES new_order(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE transaction(
   id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
   profile_id uuid NOT NULL,
   order_id uuid NOT NULL,
   code VARCHAR(100),
   type VARCHAR(50),
   mode VARCHAR(50),
   status VARCHAR (100),
   created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (order_id) REFERENCES new_order(id)

);


CREATE TABLE address(
   id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
   profile_id uuid NOT NULL,
   country VARCHAR (250) NOT NULL DEFAULT 'jordan',
   city VARCHAR(250) NOT NULL,
   first_name VARCHAR (250) NOT NULL,
   last_name VARCHAR (250) NOT NULL,
   mobile VARCHAR (15) NOT NULL,
   street_name VARCHAR(250) NOT NULL,
   building_number VARCHAR (250) NOT NULL,
   apartment_number VARCHAR (250),
   FOREIGN KEY (profile_id) REFERENCES profiles(id)
);
CREATE TABLE cart(
     id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
     profile_id uuid NOT NULL,
     address_id uuid NOT NULL,
     first_name VARCHAR (250) NOT NULL,
     last_name VARCHAR (250) NOT NULL,
     mobile VARCHAR (15) NOT NULL, 
     created_at timestamp not null default current_timestamp,

     FOREIGN KEY (profile_id) REFERENCES profiles(id),
     FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE cart_item(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  price FLOAT NOT NULL,
  discount FLOAT DEFAULT '0',
  quantity VARCHAR(6) DEFAULT '1',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (cart_id) REFERENCES cart(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


CREATE TABLE jwt(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  access_token VARCHAR(250) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);



CREATE TABLE follow(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL,
  follower uuid NOT NULL,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (follower) REFERENCES profiles(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);
 

CREATE TABLE attachment(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  file_id uuid NOT NULL,
  created_at timestamp not null default current_timestamp,
   FOREIGN KEY (file_id) REFERENCES user_file(id)
);

CREATE TABLE comment(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    comment text NOT NULL,
    product_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    store_id uuid NOT NULL,
    created_at timestamp not null default current_timestamp,

    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

CREATE TABLE offer_notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  receiver_id uuid NOT NULL,
  message text NOT NULL,
  store_id uuid,
  product_id uuid,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (receiver_id) REFERENCES profiles(id),
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


CREATE TABLE order_notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  receiver_id uuid NOT NULL,
  order_id uuid NOT NULL,
  message text NOT NULL,

  FOREIGN KEY (receiver_id) REFERENCES stores(id),
  FOREIGN KEY (order_id) REFERENCES new_order(id)
);


CREATE TABLE return(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  store_id uuid NOT NULL,
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  message text NOT NULL,

  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (order_id) REFERENCES new_order(id)
);


-- idea : add count interaction to post tabel
-- TD:fix seed and add inserts for interaction table done
-- TD: update endpoint.md done
-- TD:add end point for interaction with its handler   *** do it like follow done
-- TD:interaction tabel done
-- TD:fix insert password and insert a real hash password not yet
-- idea: add acl on verefy :check if the client is vrified and give him the access depend on it
-- delete test folder?!