
-------------------------- client Table ----------------------------------
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES 
('2fa53b27-a3d7-406f-9f91-c7f3950e9078','emranaloul@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0798009950','jordan','amman','emran','aloul','aa25ss568165asffjs','kjaffjjsu8s5895s',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES
 ('4b9a4f7b-6c1c-4039-9e29-26909a63021c','amjadmesmar@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796750891','jordan','irbid','amjad','mesmar','aa25ss86816fff5ajs','kjajfgw9su85895s',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES
 ('507f39aa-9122-4f24-8d18-d928bea2c1ba','wesam@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','009627966851','jordan','irbid','wesam','al-masri',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES 
('14a60467-c390-4ca7-a1be-5d0ee11d9ad8','aa0796780751@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780751','jordan','amman','ahmad','arman','aa25ss568165ajs','kjajjsu85895s',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES 
('c18130af-13f7-406f-a166-97aefe30b0ac','omar@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780752','jordan','amman','omar','aloul',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES 
('a15a4bc4-5d1c-41c0-a214-54ecb1bc4ac7','amr@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780753','jordan','amman','amr','aloul',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES 
('ad49a1b2-c25d-40f6-a512-45398eebe024','khaled@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780754','jordan','amman','khaled','aloul',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES 
('36577d44-f6a0-4008-a1e7-a5df77d60397','muhammad@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780755','jordan','amman','muhammad','aloul',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES 
('9918922d-ae41-4477-937f-6485781877ef','hani@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780756','jordan','amman','hani','aloul',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES 
('90dd4a83-0eab-41e5-930b-affc1c245306','ibrahim@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780757','jordan','amman','ibrahim','arman',true);


      
-------------------------- profile Table --------------------------------
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile,profile_picture, email) VALUES
('fca8e07b-ac7d-4ce8-8437-53c54ca85857','2fa53b27-a3d7-406f-9f91-c7f3950e9078','emran','aloul','amman','jordan','0798009950','e9b6516a-16b8-43fd-836c-9df52dbd55e1','emranaloul@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile,profile_picture, email) VALUES
('d7a36645-a598-4584-a158-23615a865ac9','4b9a4f7b-6c1c-4039-9e29-26909a63021c','amjad','mesmar','irbid','jordan','0796750891','3b47e66c-690b-4eb2-8c24-4f0117c9ab83','amjadmesmar@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile,profile_picture, email) VALUES
('1821db68-97c9-4380-9a55-ad8bc7f16eda','14a60467-c390-4ca7-a1be-5d0ee11d9ad8','ahmad','arman','amman','jordan','079655780751','5f04b02b-a142-4445-a65f-bf5542d1fbd4','aa0796780751@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('3be97674-8ce4-49a8-a378-605965c4b98c','507f39aa-9122-4f24-8d18-d928bea2c1ba','wesam','al-masri','irbid','jordan','009627966851','wesam@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('90f9a920-3a6e-49ee-89bb-96fe3a0c9c43','a15a4bc4-5d1c-41c0-a214-54ecb1bc4ac7','amr','aloul','amman','jordan','00962796780753','amr@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('80eb4f35-c33f-46e0-bcdf-cc48098bef89','c18130af-13f7-406f-a166-97aefe30b0ac','omar','aloul','amman','jordan','00962796780752','omar@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('9c4e87b5-fa2c-41e3-87b3-18fc0683b062','ad49a1b2-c25d-40f6-a512-45398eebe024','khaled','aloul','amman','jordan','00962796780754','khaled@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('e1da23a3-3bb6-4015-abff-9ce01815ab73','36577d44-f6a0-4008-a1e7-a5df77d60397','muhammad','aloul','amman','jordan','00962796780755','muhammad@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('f11940fb-3c57-44a8-bc77-4f6edfac093a','9918922d-ae41-4477-937f-6485781877ef','hani','aloul','amman','jordan','00962796780756','hani@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('0aedb3fd-2953-4da9-9414-b9587b6d63f0','90dd4a83-0eab-41e5-930b-affc1c245306','ibrahim','arman','amman','jordan','00962796780757','ibrahim@gmail.com');

------------------------- Stores Table ----------------------------------
INSERT INTO store(id,profile_id,store_name,city,caption,about,store_picture,store_rating, status, mobile) VALUES 
('72280f37-2ca7-4808-90d2-3ecec783b163','fca8e07b-ac7d-4ce8-8437-53c54ca85857','DK-beauty','amman','love live love dk-beauty','الجودة عالية والاسعار منافسة','https://horizon-uploader.s3.us-east-2.amazonaws.com/default+pictures/1923159.png','5', 'approved', 0798988874);

INSERT INTO store(id,profile_id,store_name,city,caption,about,store_picture,store_rating,mobile) VALUES 
('93e4029f-2aae-4d75-83df-ee4a06d2e589','1821db68-97c9-4380-9a55-ad8bc7f16eda','DK-beauty-daleen','amman','love live love dk-beauty-daleen','الجودة عالية والاسعار منافسة','https://horizon-uploader.s3.us-east-2.amazonaws.com/default+pictures/1923159.png','4', 0788454115);

------------------------------- parent_category -----------------------------------------

INSERT INTO parent_category(id,entitle,artitle ,metaTitle,content) VALUES 
('2f4894ff-12a9-441d-b606-d235bd2449be','clothing','ملابس','clothing', 'clothing');

--------------------------- child_category -----------------------------------------------
INSERT INTO child_category(id,parent_id,entitle,artitle,metaTitle,content) VALUES 
('84ba935f-61a3-4ae7-97b6-1c04b016c920','2f4894ff-12a9-441d-b606-d235bd2449be','men','رجال','clothes men','the clothes are perfect with summer');

-------------------------- grandchild_category Table --------------------------
INSERT INTO grandchild_category(id,parent_id,entitle,artitle,metaTitle,content) VALUES 
('257750e6-0e74-424e-9f45-34317a397480','84ba935f-61a3-4ae7-97b6-1c04b016c920','summer','الصيف','the clothes are perfect with summer', 'summer');

------------------------- Product Table ----------------------------------
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount,discount_rate,price,brand_name,endescription,quantity,ardescription) VALUES 
('0047da41-5e33-460a-88da-5cfa2b9d8724','72280f37-2ca7-4808-90d2-3ecec783b163','shoes','حذاء','boot','55556936862ls','2f4894ff-12a9-441d-b606-d235bd2449be','84ba935f-61a3-4ae7-97b6-1c04b016c920','257750e6-0e74-424e-9f45-34317a397480',false,'0.02','12.99','DK','boot very nive and beautiful ',5, 'منتج');
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount,discount_rate,price,brand_name,endescription,quantity,ardescription) VALUES 
('771fea26-f56c-4e19-b842-9b136b889473','72280f37-2ca7-4808-90d2-3ecec783b163','clothing','ملابس','EXLURA Womens High Waist Polka Dot Pleated Skirt Midi Swing Skirt with Pockets','555569368s62ls','2f4894ff-12a9-441d-b606-d235bd2449be','84ba935f-61a3-4ae7-97b6-1c04b016c920','257750e6-0e74-424e-9f45-34317a397480',false,'0.01','5.99','DK','boot very nive and beautiful ',5, 'منتج');
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount,discount_rate,price,brand_name,endescription,quantity,ardescription) VALUES 
('defdba13-6d21-4147-982e-6444ca9e2361','72280f37-2ca7-4808-90d2-3ecec783b163','watches','ساعات','watch very nive and beautiful','5945919951A','2f4894ff-12a9-441d-b606-d235bd2449be','84ba935f-61a3-4ae7-97b6-1c04b016c920','257750e6-0e74-424e-9f45-34317a397480',false,'0.01','15.99','DK','nice',5, 'منتج');

----------------------------- product_review ------------------------------------
INSERT INTO product_review(id,profile_id,product_id,review,rate)
VALUES('7f3094e1-e872-492f-8e40-c485a1e21d9b','fca8e07b-ac7d-4ce8-8437-53c54ca85857','0047da41-5e33-460a-88da-5cfa2b9d8724','very nice pruduct','3');
INSERT INTO product_review(id,profile_id,product_id,review,rate)
VALUES('d4df9477-0b36-4376-8927-b5f974abfa98','3be97674-8ce4-49a8-a378-605965c4b98c','0047da41-5e33-460a-88da-5cfa2b9d8724','very bad product','0');

--------------------------  Tag Table -------------------------------------
INSERT INTO tag(id,entitle,arTitle,metaTitle,slug,content) VALUES 
('847d0ae5-e64e-4884-8534-63e6074baa78','94c2092f-31de-454c-8227-b403813e3b0e','color','red','red85%','red very nice');

------------------------- Product Tag Table ----------------------------------
INSERT INTO product_tag(id,product_id,tag_id) VALUES ('94c2092f-31de-454c-8227-b403813e3b0e','0047da41-5e33-460a-88da-5cfa2b9d8724','847d0ae5-e64e-4884-8534-63e6074baa78');


----------------------------- product_rating ------------------------------------
INSERT INTO product_rating(id,product_id,rating,votes)
VALUES('7f3094e1-e872-492f-8e40-c485a1e21d9b','0047da41-5e33-460a-88da-5cfa2b9d8724','3','200');
INSERT INTO product_rating(id,product_id,rating,votes)
VALUES('d4df9477-0b36-4376-8927-b5f974abfa98','771fea26-f56c-4e19-b842-9b136b889473','0','199');


------------------------------- product_pictures --------------------------------------
INSERT INTO product_picture(id,product_id,product_picture) VALUES 
('b7f0ab0c-1b3a-405c-8935-fea9232e0f28','0047da41-5e33-460a-88da-5cfa2b9d8724','https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png');


------------------------------ profile_picture -----------------------------------------
INSERT INTO profile_picture (id,profile_id,profile_picture) VALUES 
('8f236701-30e5-4277-9bc8-cec66d21aae0','fca8e07b-ac7d-4ce8-8437-53c54ca85857','https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png');



-------------------------------- store_reviews -----------------------------------
INSERT INTO store_review(id,profile_id,store_id,review,rate)VALUES
('cda2e641-a419-444a-b8d7-65ce8ff3d0cd','d7a36645-a598-4584-a158-23615a865ac9','72280f37-2ca7-4808-90d2-3ecec783b163','the store is very good offers ','4.3');

-------------------------------- store_reviews2 -----------------------------------
INSERT INTO store_review_2(id,store_id)VALUES
('cda2e641-a419-844a-b7d7-65ce8ee3d0cd','72280f37-2ca7-4808-90d2-3ecec783b163');


----------------------------------address -----------------------------
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','fca8e07b-ac7d-4ce8-8437-53c54ca85857','jordan','amman','emran','aloul','0798009950','abdallah alnazhan','13','2');
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('9e0e31ac-757b-4f25-afe1-61ed9ccb40d2','fca8e07b-ac7d-4ce8-8437-53c54ca85857','uae','dubai','emran','aloul','0798009950','abdallah alnazhan','13','8');
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('75251081-2962-4f89-b482-50caa0452c8d','0aedb3fd-2953-4da9-9414-b9587b6d63f0','jordan','amman','ibrahim','arman','0796780757','al rawda street','13','8');



--------------------------------- new_order ----------------------------------------
INSERT INTO new_order(id,customer_order_id,profile_id,address_id,tax,shipping,sub_total,grand_total)VALUES
('82e018d1-b731-489c-a62b-f719cdf4bb8b', 12345,'fca8e07b-ac7d-4ce8-8437-53c54ca85857','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','0.01','1','20','22');
INSERT INTO new_order(id,customer_order_id,profile_id,address_id,tax,shipping,sub_total,grand_total)VALUES
('95f3a0e3-aa40-47eb-8315-a58c42ed8697',12346,'1821db68-97c9-4380-9a55-ad8bc7f16eda','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','0.01','0.02','20','22');
INSERT INTO new_order(id,customer_order_id,profile_id,address_id,tax,shipping,sub_total,grand_total)VALUES
('2fcc1422-4405-4031-b362-e76533ef3b8a',12347,'3be97674-8ce4-49a8-a378-605965c4b98c','75251081-2962-4f89-b482-50caa0452c8d','0.01','0.02','20','22');

-------------------------------- order_item ----------------------------------------
INSERT INTO order_item (id,order_id,profile_id,product_id,store_id,price,discount,quantity,last_update,date_after_day)Values
('39d9e68f-98a3-4347-b961-2c5bb4db1c26','82e018d1-b731-489c-a62b-f719cdf4bb8b','fca8e07b-ac7d-4ce8-8437-53c54ca85857','0047da41-5e33-460a-88da-5cfa2b9d8724','72280f37-2ca7-4808-90d2-3ecec783b163','12.99','0','3','2022-01-18 16:58:06.490','2022-01-19');
INSERT INTO order_item (id,order_id,profile_id,product_id,store_id,price,discount,quantity,last_update,date_after_day)Values
('31c4c913-80b6-4ef0-846b-42e98bf5066b','95f3a0e3-aa40-47eb-8315-a58c42ed8697','1821db68-97c9-4380-9a55-ad8bc7f16eda','0047da41-5e33-460a-88da-5cfa2b9d8724','93e4029f-2aae-4d75-83df-ee4a06d2e589','12.99','0','3','2022-01-05 16:58:06.490','2022-01-06');
INSERT INTO order_item (id,order_id,profile_id,product_id,store_id,price,discount,quantity,last_update,date_after_day)Values
('ca9c4c67-c290-4342-b667-5dffaee2193b','2fcc1422-4405-4031-b362-e76533ef3b8a','3be97674-8ce4-49a8-a378-605965c4b98c','defdba13-6d21-4147-982e-6444ca9e2361','72280f37-2ca7-4808-90d2-3ecec783b163','12.99','0','3','2022-04-15 16:58:06.490','2022-04-15');


-------------------------------- transaction ----------------------------
INSERT INTO transaction(id,profile_id,order_id,code,type,mode,status)VALUES 
('b90a2a5a-891d-4baa-b63a-01bce1ee570d','fca8e07b-ac7d-4ce8-8437-53c54ca85857','82e018d1-b731-489c-a62b-f719cdf4bb8b','55456186222s6','mastercard','Read-Only','approved');




---------------------------------- cart -----------------------------
INSERT INTO cart(id,profile_id,address_id)VALUES 
('07426572-9679-435c-a973-70e24a508ce7','fca8e07b-ac7d-4ce8-8437-53c54ca85857','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f');
INSERT INTO cart(id,profile_id,address_id)VALUES 
('07426572-9679-435c-a973-70e24a508ce5','3be97674-8ce4-49a8-a378-605965c4b98c','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f');
INSERT INTO cart(id,profile_id,address_id)VALUES 
('07426572-9679-435c-a973-70e24a508ce4','0aedb3fd-2953-4da9-9414-b9587b6d63f0','75251081-2962-4f89-b482-50caa0452c8d');


------------------------------------cart_item -----------------------------
INSERT INTO cart_item(id,cart_id,product_id,store_id,price,discount,quantity)VALUES
('70dfb852-0925-44e9-b09b-4d7b07935cf9','07426572-9679-435c-a973-70e24a508ce7','0047da41-5e33-460a-88da-5cfa2b9d8724','72280f37-2ca7-4808-90d2-3ecec783b163','12.99','0','2');
INSERT INTO cart_item(id,cart_id,product_id,store_id,price,discount,quantity)VALUES
('3b15f5d6-fdaa-443f-be99-cb42b85ae16c','07426572-9679-435c-a973-70e24a508ce4','0047da41-5e33-460a-88da-5cfa2b9d8724','72280f37-2ca7-4808-90d2-3ecec783b163','12.99','0','2');



------------------------------- jwt ----------------------------------
INSERT INTO jwt (id,user_id,access_token,refresh_token)VALUES 
('44b54ebd-44a4-4733-81ea-3af2be8a3d93','2fa53b27-a3d7-406f-9f91-c7f3950e9078','aaa','sss');


-------------------------------- store followers ----------------------------
INSERT INTO store_follower(id,store_id,follower)VALUES 
('792d59a3-34b8-4838-8765-af9afe69e158','72280f37-2ca7-4808-90d2-3ecec783b163','fca8e07b-ac7d-4ce8-8437-53c54ca85857');


-----------------------------------comment ----------------
INSERT INTO comment(id,comment,product_id,profile_id,store_id)VALUES 
('7a22194e-d7bc-417d-ba87-bec1c008ae1d','jhedjbbedwde','0047da41-5e33-460a-88da-5cfa2b9d8724','fca8e07b-ac7d-4ce8-8437-53c54ca85857','72280f37-2ca7-4808-90d2-3ecec783b163');


------------------------------offer_notification -------------------
-- INSERT INTO offer_notification(id,receiver_id,message,store_id,product_id)VALUES
-- ('576f249f-a18c-4901-8cde-c9f8eadddb3c','fca8e07b-ac7d-4ce8-8437-53c54ca85857','swwwwwww','72280f37-2ca7-4808-90d2-3ecec783b163','0047da41-5e33-460a-88da-5cfa2b9d8724');


---------------------------- order_notification --------------------------------
INSERT INTO order_notification(id,receiver_id,order_id,message)VALUES
('6007f70b-2afa-46a9-a6cc-777b224700be','72280f37-2ca7-4808-90d2-3ecec783b163','82e018d1-b731-489c-a62b-f719cdf4bb8b','hduwegewgdsgdsgdsaaa');

-------------------------- courier_company -------------------------
INSERT INTO courier_company (id,profile_id,company_name,status)VALUES 
('6026735d-0ed1-47d5-98cf-8a18ef763b71','fca8e07b-ac7d-4ce8-8437-53c54ca85857','emran','approved');

--------------------------- courier ------------------------------
INSERT INTO courier (id,profile_id,company_id)VALUES 
('d5674198-db4e-42f0-a164-cd8f939631f5','1821db68-97c9-4380-9a55-ad8bc7f16eda','6026735d-0ed1-47d5-98cf-8a18ef763b71');

--------------------------- courier ------------------------------
INSERT INTO courier(id,profile_id)VALUES
('46a3f3a3-8050-4d48-8548-d81618af2a29','d7a36645-a598-4584-a158-23615a865ac9');

--------------------------- delivery_task ------------------------------
INSERT INTO delivery_task(id,order_id,address_id)VALUES
('10d433fd-4b84-4059-a214-85af962d3a2d','82e018d1-b731-489c-a62b-f719cdf4bb8b', '7c0c7345-9c9a-4697-9eec-5618cf4dbf8f');
INSERT INTO delivery_task(id,order_id,address_id)VALUES
('db8c37b3-28b4-4b11-ad37-fb676f03162a','95f3a0e3-aa40-47eb-8315-a58c42ed8697', '7c0c7345-9c9a-4697-9eec-5618cf4dbf8f');

------------------------- courier_task ------------------------------
INSERT INTO courier_task(id,courier_id,task_id)VALUES
('1beb2148-cdd5-44e4-b1d6-2a6e6e8af454','d5674198-db4e-42f0-a164-cd8f939631f5','10d433fd-4b84-4059-a214-85af962d3a2d');

-------------------------- courier_feedback Table --------------------------
INSERT INTO courier_feedback(id,courier_id,rate,review)VALUES
('9a58e0fe-ab3c-4321-b93e-af33b25919ab','d5674198-db4e-42f0-a164-cd8f939631f5','2','very tired ');
