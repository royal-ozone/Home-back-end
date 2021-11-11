DROP TABLE IF EXISTS product_tag;
DROP TABLE IF EXISTS tag;


DROP TABLE IF EXISTS product_picture;
DROP TABLE IF EXISTS profile_picture;

DROP TABLE IF EXISTS store_picture;
DROP TABLE IF EXISTS product_review;
DROP TABLE IF EXISTS product_rating;
DROP TABLE IF EXISTS store_review;


DROP TABLE IF EXISTS return;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS jwt;
DROP TABLE IF EXISTS store_follower;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS offer_notification;
DROP TABLE IF EXISTS order_notification;

DROP TABLE IF EXISTS attachment;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS grandchild_category;
DROP TABLE IF EXISTS child_category;
DROP TABLE IF EXISTS parent_category;
DROP TABLE IF EXISTS new_order;

DROP TABLE IF EXISTS store;

DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS user_file;

DROP TABLE IF EXISTS administrator;
DROP TABLE IF EXISTS moderator;
DROP TABLE IF EXISTS banned_user;
DROP TABLE IF EXISTS client;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



CREATE TABLE client(
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
  status VARCHAR(15) DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE jwt(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  access_token VARCHAR(250) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES client(id)
);


CREATE TABLE profile(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  country VARCHAR (250) NOT NULL,
  mobile VARCHAR (15) NOT NULL UNIQUE,
  profile_picture TEXT,
  created_at timestamp not null default current_timestamp,
  

  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE administrator(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE moderator(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE banned_user(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE store(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL UNIQUE,
  store_name VARCHAR (250) NOT NULL,
  name_is_changed BOOLEAN DEFAULT FALSE,
  city VARCHAR (250) NOT NULL,
  address VARCHAR (250) DEFAULT 'Remote',
  mobile VARCHAR (15) NOT NULL UNIQUE,
  caption VARCHAR(250),
  about VARCHAR(250),
  store_picture TEXT,
  store_rating REAL NOT NULL DEFAULT 0,
  status VARCHAR(250) DEFAULT 'pending',
  rejected_reason TEXT DEFAULT '',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profile(id)
);



CREATE TABLE parent_category(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  entitle VARCHAR(75) UNIQUE,
  artitle VARCHAR(75) UNIQUE,
  metaTitle VARCHAR(100),
  content TEXT,
  created_at timestamp not null default current_timestamp
  
);
CREATE TABLE child_category(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  parent_id uuid NOT NULL,
  entitle VARCHAR(75),
  artitle VARCHAR(75),
  metaTitle VARCHAR(100),
  content TEXT,
   FOREIGN KEY (parent_id) REFERENCES parent_category(id),
  created_at timestamp not null default current_timestamp
);
CREATE TABLE grandchild_category(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  parent_id uuid NOT NULL,
  entitle VARCHAR(75),
  artitle VARCHAR(75),
  metaTitle VARCHAR(100),
  content TEXT,
  FOREIGN KEY (parent_id) REFERENCES child_category(id),
  created_at timestamp not null default current_timestamp
);


CREATE TABLE product(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL,
  enTitle VARCHAR(250) NOT NULL,
  arTitle VARCHAR(250) NOT NULL,
  metaTitle VARCHAR(100),
  sku VARCHAR(100),
  parent_category_id uuid NOT NULL,
  child_category_id uuid NOT NULL,
  grandchild_category_id uuid,
  discount BOOLEAN DEFAULT FALSE,
  discount_rate FLOAT DEFAULT 0,
  price REAL NOT NULL,
  currency VARCHAR(10) default 'jod',
  brand_name VARCHAR(250),
  description text NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  status VARCHAR(250) DEFAULT 'pending',
  created_at timestamp not null default current_timestamp,
  
  FOREIGN KEY (store_id) REFERENCES store(id),
  FOREIGN KEY (parent_category_id) REFERENCES parent_category(id),
  FOREIGN KEY (child_category_id) REFERENCES child_category(id),
  FOREIGN KEY (grandchild_category_id) REFERENCES grandchild_category(id)
);

CREATE TABLE product_review(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  product_id uuid NOT NULL,
  review VARCHAR(250) NOT NULL,
  rate VARCHAR(1) NOT NULL,
  votes INT DEFAULT 0,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE tag(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  entitle VARCHAR(75) not null,
  arTitle VARCHAR(75) not null,
  metaTitle VARCHAR(100),
  slug VARCHAR(100),
  content TEXT
  
);
CREATE TABLE product_tag(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  product_id uuid NOT NULL,
  tag_id uuid NOT NULL,

  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (tag_id) REFERENCES tag(id)
);
CREATE TABLE product_rating(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  product_id uuid NOT NULL,
  rating REAL NOT NULL DEFAULT 0,
  votes REAL DEFAULT 0,

  FOREIGN KEY (product_id) REFERENCES product(id) 
);


CREATE TABLE product_picture(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  product_id uuid NOT NULL,
  product_picture TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE profile_picture(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  profile_picture TEXT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile(id)
);


CREATE TABLE store_review(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL UNIQUE,
  store_id uuid NOT NULL,
  review VARCHAR(250) NOT NULL,
  rate FLOAT NOT NULL DEFAULT 0,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (store_id) REFERENCES store(id)
);


CREATE TABLE new_order(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  status VARCHAR (250)  DEFAULT 'pending',
  tax FLOAT,
  shipping FLOAT,
  discount FLOAT DEFAULT 0,
  sub_total FLOAT NOT NULL,
  grand_total FLOAT NOT NULL,
  mobile VARCHAR (15) NOT NULL, 
  city VARCHAR (250) NOT NULL,
  country VARCHAR (250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (profile_id) REFERENCES profile(id)
  );

CREATE TABLE order_item (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  price FLOAT NOT NULL,
  discount FLOAT DEFAULT 0,
  quantity REAL DEFAULT 1,
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

  FOREIGN KEY (profile_id) REFERENCES profile(id),
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
   FOREIGN KEY (profile_id) REFERENCES profile(id)
);
CREATE TABLE cart(
     id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
     profile_id uuid NOT NULL,
     address_id uuid NOT NULL,
     first_name VARCHAR (250) NOT NULL,
     last_name VARCHAR (250) NOT NULL,
     mobile VARCHAR (15) NOT NULL, 
     created_at timestamp not null default current_timestamp,

     FOREIGN KEY (profile_id) REFERENCES profile(id),
     FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE cart_item(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  price FLOAT NOT NULL,
  discount FLOAT DEFAULT 0,
  quantity REAL DEFAULT 1,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (cart_id) REFERENCES cart(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE store_follower(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL,
  follower uuid NOT NULL,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (follower) REFERENCES profile(id),
  FOREIGN KEY (store_id) REFERENCES store(id)
);
 

CREATE TABLE comment(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    comment text NOT NULL,
    product_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    store_id uuid NOT NULL,
    created_at timestamp not null default current_timestamp,

    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (store_id) REFERENCES store(id),
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);

CREATE TABLE offer_notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  receiver_id uuid NOT NULL,
  message text NOT NULL,
  store_id uuid,
  product_id uuid,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (receiver_id) REFERENCES profile(id),
  FOREIGN KEY (store_id) REFERENCES store(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


CREATE TABLE order_notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  receiver_id uuid NOT NULL,
  order_id uuid NOT NULL,
  message text NOT NULL,

  FOREIGN KEY (receiver_id) REFERENCES store(id),
  FOREIGN KEY (order_id) REFERENCES new_order(id)
);


CREATE TABLE return_request(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  store_id uuid NOT NULL,
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  status VARCHAR(15) DEFAULT 'pending',
  message text NOT NULL,

  FOREIGN KEY (store_id) REFERENCES store(id),
  FOREIGN KEY (profile_id) REFERENCES profile(id),
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