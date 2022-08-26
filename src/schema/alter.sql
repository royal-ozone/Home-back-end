-- ALTER TABLE product
-- RENAME COLUMN size TO size_and_color;

-- ALTER TABLE product
-- ALTER COLUMN size_and_color VARCHAR(10000);

-- ALTER TABLE store ADD COLUMN tempbar text;
-- UPDATE store SET tempbar = cast(cast( verification_code as varchar(15)) as varchar(15));
-- ALTER TABLE store DROP COLUMN verification_code;
-- ALTER TABLE store ADD COLUMN verification_code varchar(250);
-- UPDATE store SET verification_code = tempbar;
-- ALTER TABLE store DROP COLUMN tempbar;

-- ALTER TABLE order_item
-- ADD color VARCHAR(50);
-- ALTER TABLE cart_item
-- ADD color VARCHAR(50);
-- ALTER TABLE address
-- ADD COLUMN store_address BOOLEAN;

-- ALTER TABLE store
-- ADD COLUMN mobile VARCHAR(15) NOT NULL unique;

-- ALTER table client 
-- add column password_reset_token uuid;

-- ALTER table client 
-- add column reset_token_date TIMESTAMP;

-- ALTER TABLE product DROP COLUMN verification_code;

-- CREATE TABLE business_transaction(
--    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
--    courier_id uuid,
--    store_id uuid,
--    order_id uuid,
--    order_item_id uuid,
--    type VARCHAR(50),
--    amount float NOT NULL,
--    status VARCHAR (100),

--    created_at timestamp not null default current_timestamp,

--   FOREIGN KEY (courier_id) REFERENCES courier_company(id),
--   FOREIGN KEY (store_id) REFERENCES store(id),
--   FOREIGN KEY (order_id) REFERENCES new_order(id),
--   FOREIGN KEY (order_item_id) REFERENCES order_item(id)

-- );

-- CREATE TABLE account (
-- id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
-- title varchar(50) NOT NULL,
-- profile_id uuid NOT NULL,
-- type varchar(50) NOT NULL,
--  courier_id uuid,
--    store_id uuid,
--    reference varchar(255) NOT NULL,

--     FOREIGN KEY (courier_id) REFERENCES courier_company(id),
--   FOREIGN KEY (store_id) REFERENCES store(id),
-- FOREIGN KEY (profile_id) REFERENCES profile(id)
-- );

CREATE TABLE withdrawal (
id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
account_id uuid NOT NULL,
profile_id uuid NOT NULL,
account_type varchar(50),
amount float not null,
type VARCHAR(50),
status VARCHAR(50) DEFAULT 'requested',
updated timestamp,
document text,
created_at timestamp not null default current_timestamp,
FOREIGN KEY (account_id) REFERENCES account(id),
FOREIGN KEY (profile_id) REFERENCES profile(id)


)




