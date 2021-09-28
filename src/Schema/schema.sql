DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS store_reviews;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS jwt;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_reviews;

DROP TABLE IF EXISTS parent_categories;
DROP TABLE IF EXISTS child_categories;
DROP TABLE IF EXISTS grandchild_categories;

DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS user_file;
DROP TABLE IF EXISTS notification;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(250) NOT NULL,
  mobile BIGINT(20) NOT NULL UNIQUE,
  country VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  google_id VARCHAR(200) UNIQUE,
  facebook_id VARCHAR(200) UNIQUE,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE stores(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  store_name VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  address VARCHAR (250) DEFAULT 'Remote',
  mobile BIGINT(20) NOT NULL UNIQUE,
  caption VARCHAR(250),
  about VARCHAR(250),
  store_picture uuid,
  reviews_rate REAL NOT NULL DEFAULT '0',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_picture) REFERENCES user_file(id)
);

CREATE TABLE product_reviews(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  product_id uuid NOT NULL UNIQUE,
  review VARCHAR(250) NOT NULL,
  rate INT(1) NOT NULL,
  votes INT(250) DEFAULT '0',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE store_reviews(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  store_id uuid NOT NULL UNIQUE,
  review VARCHAR(250) NOT NULL,
  rate INT(1) NOT NULL,
  votes INT(250) DEFAULT '0',
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE profiles(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  city VARCHAR (250) NOT NULL,
  mobile BIGINT(20) NOT NULL UNIQUE,
  caption VARCHAR(250),
  profile_picture uuid,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (profile_picture) REFERENCES user_file(id)
);

CREATE TABLE jwt(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  access_token VARCHAR(250) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_file(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  file text NOT NULL,
  created_at date not null default current_timestamp
);


CREATE TABLE follow(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  follower uuid NOT NULL,
  following uuid NOT NULL, -- search in the name to find the id ?
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (follower) REFERENCES profile(id),
  FOREIGN KEY (following) REFERENCES profile(id)
);

CREATE TABLE message(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  sender_id uuid NOT NULL,
  receiver_id uuid NOT NULL,
  message text NOT NULL ,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (sender_id) REFERENCES profile(id),
  FOREIGN KEY (receiver_id) REFERENCES profile(id)
);

CREATE TABLE category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);


CREATE TABLE post(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  category_id int NOT NULL,
  text text NOT NULL,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE attachment(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  post_id uuid NOT NULL,
  file_id uuid NOT NULL,
  created_at timestamp not null default current_timestamp

);

CREATE TABLE comment(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    comment text NOT NULL,
    post_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    created_at timestamp not null default current_timestamp

);

CREATE TABLE notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  receiver_id uuid NOT NULL,
  message text NOT NULL,
  post_id uuid,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (receiver_id) REFERENCES profile(id)
);

DROP TABLE IF EXISTS interaction;
CREATE TABLE interaction( 
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,   
    profile_id uuid ,
    post_id uuid NOT NULL,
    interaction_type VARCHAR(20) DEFAULT 'like',
    created_at timestamp not null default current_timestamp

);

-- idea : add count interaction to post tabel
-- TD:fix seed and add inserts for interaction table done
-- TD: update endpoint.md done
-- TD:add end point for interaction with its handler   *** do it like follow done
-- TD:interaction tabel done
-- TD:fix insert password and insert a real hash password not yet
-- idea: add acl on verefy :check if the client is vrified and give him the access depend on it
-- delete test folder?!