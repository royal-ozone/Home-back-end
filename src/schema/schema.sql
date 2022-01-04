DROP TABLE IF EXISTS product_tag;
DROP TABLE IF EXISTS tag;

DROP TABLE IF EXISTS courier_feedback;
DROP TABLE IF EXISTS courier_task;
DROP TABLE IF EXISTS delivery_task_notification;
DROP TABLE IF EXISTS delivery_task;
DROP TABLE IF EXISTS courier;
DROP TABLE IF EXISTS courier_company;

DROP TABLE IF EXISTS product_picture;
DROP TABLE IF EXISTS profile_picture;

-- DROP TABLE IF EXISTS store_picture;
DROP TABLE IF EXISTS product_review;
DROP TABLE IF EXISTS product_rating;
DROP TABLE IF EXISTS store_review;

DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS return_request;
DROP TABLE IF EXISTS order_notification;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS new_order;

DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS jwt;
DROP TABLE IF EXISTS store_follower;
DROP TABLE IF EXISTS store_follower_number;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS offer_notification;

--  DROP TABLE IF EXISTS attachment;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS grandchild_category;
DROP TABLE IF EXISTS child_category;
DROP TABLE IF EXISTS parent_category;

DROP TABLE IF EXISTS store;

DROP TABLE IF EXISTS suggestion;
DROP TABLE IF EXISTS promo;
DROP TABLE IF EXISTS discount_code;

-- DROP TABLE IF EXISTS user_file;

DROP TABLE IF EXISTS administrator;
DROP TABLE IF EXISTS moderator;
DROP TABLE IF EXISTS banned_user;
DROP TABLE IF EXISTS profile;
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
  email VARCHAR (250) NOT NULL,
  country VARCHAR (250) NOT NULL,
  mobile VARCHAR (15) NOT NULL UNIQUE,
  profile_picture TEXT,
  notification_all BOOLEAN DEFAULT TRUE,
  notification_store BOOLEAN DEFAULT FALSE,
  notification_city BOOLEAN DEFAULT FALSE,
  created_at timestamp not null default current_timestamp,
  
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE administrator(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  profile_id uuid NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES client(id),
  FOREIGN KEY (profile_id) REFERENCES profile(id)
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
  store_name VARCHAR (250) NOT NULL UNIQUE,
  name_is_changed BOOLEAN DEFAULT FALSE,
  city VARCHAR (250) NOT NULL,
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
  entitle VARCHAR(75) UNIQUE NOT NULL,
  artitle VARCHAR(75) UNIQUE NOT NULL,
  metaTitle VARCHAR(100),
  content TEXT,
  display BOOLEAN DEFAULT TRUE,
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
  entitle VARCHAR(250) NOT NULL,
  artitle VARCHAR(250) NOT NULL,
  metaTitle VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
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
  age VARCHAR(250) DEFAULT '15-30' NOT NULL,
  size VARCHAR(250),
  display BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (store_id) REFERENCES store(id),
  FOREIGN KEY (parent_category_id) REFERENCES parent_category(id),
  FOREIGN KEY (child_category_id) REFERENCES child_category(id),
  FOREIGN KEY (grandchild_category_id) REFERENCES grandchild_category(id),
  created_at timestamp not null default current_timestamp
);

CREATE TABLE offer(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL,
  entitle VARCHAR(250) NOT NULL,
  artitle VARCHAR(250) NOT NULL,
  metaTitle VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  parent_category_id uuid NOT NULL,
  child_category_id uuid NOT NULL,
  grandchild_category_id uuid,
  discount_rate FLOAT NOT NULL,
  price REAL NOT NULL,
  currency VARCHAR(10) default 'jod',
  brand_name VARCHAR(250),
  description text NOT NULL,
  status VARCHAR(250) DEFAULT 'pending',
  quantity INT NOT NULL DEFAULT 0,
  age VARCHAR(250) DEFAULT '15-30' NOT NULL,
  size VARCHAR(250),
  display BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (store_id) REFERENCES store(id),
  FOREIGN KEY (parent_category_id) REFERENCES parent_category(id),
  FOREIGN KEY (child_category_id) REFERENCES child_category(id),
  FOREIGN KEY (grandchild_category_id) REFERENCES grandchild_category(id),
  created_at timestamp not null default current_timestamp   
);


CREATE TABLE product_review(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  product_id uuid NOT NULL,
  review VARCHAR(250),
  rate INT NOT NULL,
 
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
  profile_id uuid NOT NULL,
  store_id uuid NOT NULL,
  review VARCHAR(250) NOT NULL,
  rate FLOAT NOT NULL DEFAULT 0,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (store_id) REFERENCES store(id)
);


CREATE TABLE address(
   id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
   profile_id uuid NOT NULL,
   store_id uuid,
   country VARCHAR (250) NOT NULL DEFAULT 'jordan',
   city VARCHAR(250) NOT NULL,
   first_name VARCHAR (250) NOT NULL,
   last_name VARCHAR (250) NOT NULL,
   mobile VARCHAR (15) NOT NULL,
   street_name VARCHAR(250) NOT NULL,
   building_number VARCHAR (250) NOT NULL,
   apartment_number VARCHAR (250),
   display BOOLEAN DEFAULT TRUE,
   is_default BOOLEAN,

   FOREIGN KEY (profile_id) REFERENCES profile(id),
   FOREIGN KEY (store_id) REFERENCES store(id)
);

CREATE TABLE discount_code(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  discount_code VARCHAR(250) UNIQUE NOT NULL,
  year INT NOT NULL,
  month INT NOT NULL,
  day  INT NOT NULL,
  hour INT NOT NULL,
  minute INT NOT NULL,
  second INT  NOT NULL,
  counter INT default 0,
  max_counter INT NOT NULL default 50,
  discount FLOAT DEFAULT 0,
  max_discount INT NOT NULL,
  active Boolean DEFAULT FALSE,
  number_of_time INT NOT NULL,
  created_at timestamp not null default current_timestamp
);
CREATE TABLE promo(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  discount_id uuid NOT NULL,
  discount_name VARCHAR(250) NOT NULL,
  counter VARCHAR(15) NOT NULL default 0,
  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (discount_id) REFERENCES discount_code(id),
  created_at timestamp not null default current_timestamp
);

CREATE TABLE new_order(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  address_id uuid NOT NULL,
  status VARCHAR (250)  DEFAULT 'pending',
  tax FLOAT  DEFAULT 0.00,
  shipping FLOAT  DEFAULT 0,
  discount_id uuid ,
  sub_total FLOAT  DEFAULT 0,
  grand_total FLOAT  DEFAULT 0,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (discount_id) REFERENCES discount_code(id),
  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (address_id) REFERENCES address(id)
  );

CREATE TABLE order_item (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  order_id uuid NOT NULL,
  profile_id uuid NOT NULL,
  product_id uuid NOT NULL,
  store_id uuid NOT NULL,
  price FLOAT NOT NULL,
  discount FLOAT DEFAULT 0,
  quantity REAL DEFAULT 1,
  price_after FLOAT,
  status VARCHAR(50) DEFAULT 'pending',
  cancellation_reason TEXT,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (store_id) REFERENCES store(id), 
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


CREATE TABLE cart(
     id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
     profile_id uuid NOT NULL UNIQUE,
     address_id uuid,
     discount_id uuid ,
     created_at timestamp not null default current_timestamp,
     FOREIGN KEY (discount_id) REFERENCES discount_code(id),
     FOREIGN KEY (profile_id) REFERENCES profile(id),
     FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE cart_item(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL UNIQUE,
  store_id uuid NOT NULL,
  price FLOAT NOT NULL,
  discount FLOAT DEFAULT 0,
  quantity REAL DEFAULT 1,
  price_after FLOAT ,
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
 
 CREATE TABLE store_follower_number(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  store_id uuid NOT NULL UNIQUE,
  number_of_follower INT NOT NULL DEFAULT 0,
  created_at timestamp not null default current_timestamp,
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
  offer_id uuid,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (receiver_id) REFERENCES profile(id),
  FOREIGN KEY (store_id) REFERENCES store(id),
  FOREIGN KEY (offer_id) REFERENCES offer(id)
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





CREATE TABLE suggestion(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  suggestion text NOT NULL,
  status VARCHAR(15) DEFAULT 'pending',
  FOREIGN KEY (profile_id) REFERENCES profile(id),
  created_at timestamp not null default current_timestamp
);

CREATE TABLE courier_company(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid UNIQUE NOT NULL,
  company_name VARCHAR(75) NOT NULL,
  name_is_changed BOOLEAN DEFAULT FALSE,
  status VARCHAR (50) DEFAULT 'pending',
  rejected_reason TEXT,

  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (profile_id) REFERENCES profile(id)
);

CREATE TABLE courier(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid UNIQUE NOT NULL,
  company_id uuid,
  status VARCHAR (50) DEFAULT 'pending',

  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (company_id) REFERENCES courier_company(id)
);

CREATE TABLE delivery_task(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  order_id uuid NOT NULL UNIQUE,
  address_id uuid NOT NULL,
  status VARCHAR (50) DEFAULT 'not assigned',
  company_id uuid,
  courier_id uuid, 

  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (order_id) REFERENCES new_order(id),
  FOREIGN KEY (company_id) REFERENCES courier_company(id),
  FOREIGN KEY (courier_id) REFERENCES courier(id)
);

CREATE TABLE delivery_task_notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  task_id uuid NOT NULL,
  company_id uuid,
  courier_id uuid,
  message text NOT NULL,
  seen BOOLEAN DEFAULT FALSE,

  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (task_id) REFERENCES delivery_task(id),
  FOREIGN KEY (company_id) REFERENCES courier_company(id),
  FOREIGN KEY (courier_id) REFERENCES courier(id)
);

CREATE TABLE courier_task(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  courier_id uuid NOT NULL,
  task_id uuid NOT NULL,
  status VARCHAR (50) DEFAULT 'pending',

  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (task_id) REFERENCES delivery_task(id),
  FOREIGN KEY (courier_id) REFERENCES courier(id)
);


CREATE TABLE courier_feedback(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  courier_id uuid NOT NULL,
  rate INT DEFAULT 0,
  review VARCHAR(250),

  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (courier_id) REFERENCES courier(id)
)










-- idea : add count interaction to post tabel
-- TD:fix seed and add inserts for interaction table done
-- TD: update endpoint.md done
-- TD:add end point for interaction with its handler   *** do it like follow done
-- TD:interaction tabel done
-- TD:fix insert password and insert a real hash password not yet
-- idea: add acl on verefy :check if the client is vrified and give him the access depend on it
-- delete test folder?!