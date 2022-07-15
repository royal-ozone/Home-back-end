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

ALTER table client 
add column password_reset_token uuid;

ALTER table client 
add column reset_token_date TIMESTAMP;





