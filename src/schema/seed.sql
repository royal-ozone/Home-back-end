
-------------------------- client Table ----------------------------------
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES 
('2fa53b27-a3d7-406f-9f91-c7f3950e9078','emranaloul@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0798009950','jordan','amman','emran','aloul','aa25ss568165asffjs','kjaffjjsu8s5895s',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES
 ('4b9a4f7b-6c1c-4039-9e29-26909a63021c','amjadmesmar@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796750891','jordan','irbid','amjad','mesmar','aa25ss86816fff5ajs','kjajfgw9su85895s',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES
 ('507f39aa-9122-4f24-8d18-d928bea2c1ba','wesam@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','009627966851','jordan','irbid','wesam','al-masri',true);
INSERT INTO client(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES 
('14a60467-c390-4ca7-a1be-5d0ee11d9ad8','aa0796780751@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796780751','jordan','amman','ahmad','arman','aa25ss568165ajs','kjajjsu85895s',true);

      
-------------------------- profile Table --------------------------------
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile,profile_picture, email) VALUES
('fca8e07b-ac7d-4ce8-8437-53c54ca85857','2fa53b27-a3d7-406f-9f91-c7f3950e9078','emran','aloul','amman','jordan','0798009950','e9b6516a-16b8-43fd-836c-9df52dbd55e1','emranaloul@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile,profile_picture, email) VALUES
('d7a36645-a598-4584-a158-23615a865ac9','4b9a4f7b-6c1c-4039-9e29-26909a63021c','amjad','mesmar','irbid','jordan','0796750891','3b47e66c-690b-4eb2-8c24-4f0117c9ab83','amjadmesmar@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile,profile_picture, email) VALUES
('1821db68-97c9-4380-9a55-ad8bc7f16eda','14a60467-c390-4ca7-a1be-5d0ee11d9ad8','ahmad','arman','amman','jordan','079655780751','5f04b02b-a142-4445-a65f-bf5542d1fbd4','aa0796780751@gmail.com');
INSERT INTO profile(id,user_id,first_name,last_name,city,country,mobile, email) VALUES
('3be97674-8ce4-49a8-a378-605965c4b98c','507f39aa-9122-4f24-8d18-d928bea2c1ba','wesam','al-masri','irbid','jordan','009627966851','wesam@gmail.com');


------------------------- Administrator Table ----------------------------------
INSERT INTO ADMINISTRATOR (id,user_id,profile_id) VALUES ('ead286ec-467d-40fc-a750-58ed77e83d22','4b9a4f7b-6c1c-4039-9e29-26909a63021c','d7a36645-a598-4584-a158-23615a865ac9');

------------------------- Moderator Table ----------------------------------
INSERT INTO MODERATOR (id,user_id) VALUES ('3044fd16-432b-4c89-b3cd-c883681103ec','14a60467-c390-4ca7-a1be-5d0ee11d9ad8');

------------------------- Stores Table ----------------------------------
INSERT INTO store(id,profile_id,store_name,city,caption,about,store_picture,store_rating) VALUES 
('72280f37-2ca7-4808-90d2-3ecec783b163','fca8e07b-ac7d-4ce8-8437-53c54ca85857','DK-beauty','amman','love live love dk-beauty','الجودة عالية والاسعار منافسة','b6d0861e-90ac-48d6-9460-5aed8515ecbf','5');

------------------------------- parent_category -----------------------------------------
INSERT INTO parent_category(id,entitle,artitle ,metaTitle,content) VALUES 
('2f4894ff-12a9-441d-b606-d235bd2449be','clothing','ملايس','clothing', 'clothing');

--------------------------- child_category -----------------------------------------------
INSERT INTO child_category(id,parent_id,entitle,artitle,metaTitle,content) VALUES 
('84ba935f-61a3-4ae7-97b6-1c04b016c920','2f4894ff-12a9-441d-b606-d235bd2449be','men','رجال','clothes men','the clothes are perfect with summer');

-------------------------- grandchild_category Table --------------------------
INSERT INTO grandchild_category(id,parent_id,entitle,artitle,metaTitle,content) VALUES 
('257750e6-0e74-424e-9f45-34317a397480','84ba935f-61a3-4ae7-97b6-1c04b016c920','summer','الصيف','the clothes are perfect with summer', 'summer');

------------------------- Product Table ----------------------------------
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount,discount_rate,price,brand_name,description,quantity) VALUES 
('0047da41-5e33-460a-88da-5cfa2b9d8724','72280f37-2ca7-4808-90d2-3ecec783b163','shoes','حذاء','boot','55556936862ls','2f4894ff-12a9-441d-b606-d235bd2449be','84ba935f-61a3-4ae7-97b6-1c04b016c920','257750e6-0e74-424e-9f45-34317a397480',false,'0.02','12.99','DK','boot very nive and beautiful ','5');
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount,discount_rate,price,brand_name,description,quantity) VALUES 
('771fea26-f56c-4e19-b842-9b136b889473','72280f37-2ca7-4808-90d2-3ecec783b163','clothing','ملايس','EXLURA Womens High Waist Polka Dot Pleated Skirt Midi Swing Skirt with Pockets','555569368s62ls','2f4894ff-12a9-441d-b606-d235bd2449be','84ba935f-61a3-4ae7-97b6-1c04b016c920','257750e6-0e74-424e-9f45-34317a397480',false,'0.01','5.99','DK','boot very nive and beautiful ','5');
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount,discount_rate,price,brand_name,description,quantity) VALUES 
('defdba13-6d21-4147-982e-6444ca9e2361','72280f37-2ca7-4808-90d2-3ecec783b163','watches','ساعات','watch very nive and beautiful','5945919951A','2f4894ff-12a9-441d-b606-d235bd2449be','84ba935f-61a3-4ae7-97b6-1c04b016c920','257750e6-0e74-424e-9f45-34317a397480',false,'0.01','15.99','DK','nice','5');

----------------------------- product_review ------------------------------------
INSERT INTO product_review(id,profile_id,product_id,review,rate,votes)
VALUES('7f3094e1-e872-492f-8e40-c485a1e21d9b','fca8e07b-ac7d-4ce8-8437-53c54ca85857','0047da41-5e33-460a-88da-5cfa2b9d8724','very nice pruduct','3','200');
INSERT INTO product_review(id,profile_id,product_id,review,rate,votes)
VALUES('d4df9477-0b36-4376-8927-b5f974abfa98','3be97674-8ce4-49a8-a378-605965c4b98c','0047da41-5e33-460a-88da-5cfa2b9d8724','very bad product','0','199');

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
('b7f0ab0c-1b3a-405c-8935-fea9232e0f28','0047da41-5e33-460a-88da-5cfa2b9d8724','https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-store.jpg');


------------------------------ profile_picture -----------------------------------------
INSERT INTO profile_picture (id,profile_id,profile_picture) VALUES 
('8f236701-30e5-4277-9bc8-cec66d21aae0','fca8e07b-ac7d-4ce8-8437-53c54ca85857','https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-store.jpg');



-------------------------------- store_reviews -----------------------------------
INSERT INTO store_review(id,profile_id,store_id,review,rate)VALUES
('cda2e641-a419-444a-b8d7-65ce8ff3d0cd','3be97674-8ce4-49a8-a378-605965c4b98c','72280f37-2ca7-4808-90d2-3ecec783b163','the store is very good offers ','4.3');


----------------------------------address -----------------------------
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','fca8e07b-ac7d-4ce8-8437-53c54ca85857','jordan','amman','emran','aloul','0798009950','abdallah alnazhan','13','2');
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('9e0e31ac-757b-4f25-afe1-61ed9ccb40d2','fca8e07b-ac7d-4ce8-8437-53c54ca85857','uae','dubai','emran','aloul','0798009950','abdallah alnazhan','13','8');

--------------------------------- new_order ----------------------------------------
INSERT INTO new_order(id,profile_id,address_id,tax,shipping,discount,sub_total,grand_total)VALUES
('82e018d1-b731-489c-a62b-f719cdf4bb8b','fca8e07b-ac7d-4ce8-8437-53c54ca85857','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','0.01','0.02','0','20','22');
INSERT INTO new_order(id,profile_id,address_id,tax,shipping,discount,sub_total,grand_total)VALUES
('95f3a0e3-aa40-47eb-8315-a58c42ed8697','fca8e07b-ac7d-4ce8-8437-53c54ca85857','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','0.01','0.02','0','20','22');


-------------------------------- order_item ----------------------------------------
INSERT INTO order_item (id,order_id,product_id,price,discount,quantity)Values
('39d9e68f-98a3-4347-b961-2c5bb4db1c26','82e018d1-b731-489c-a62b-f719cdf4bb8b','0047da41-5e33-460a-88da-5cfa2b9d8724','12.99','0','3' );
INSERT INTO order_item (id,order_id,product_id,price,discount,quantity)Values
('31c4c913-80b6-4ef0-846b-42e98bf5066b','95f3a0e3-aa40-47eb-8315-a58c42ed8697','0047da41-5e33-460a-88da-5cfa2b9d8724','12.99','0','3');


-------------------------------- transaction ----------------------------
INSERT INTO transaction(id,profile_id,order_id,code,type,mode,status)VALUES 
('b90a2a5a-891d-4baa-b63a-01bce1ee570d','fca8e07b-ac7d-4ce8-8437-53c54ca85857','82e018d1-b731-489c-a62b-f719cdf4bb8b','55456186222s6','mastercard','Read-Only','approved');




---------------------------------- cart -----------------------------
INSERT INTO cart(id,profile_id,address_id)VALUES 
('07426572-9679-435c-a973-70e24a508ce7','fca8e07b-ac7d-4ce8-8437-53c54ca85857','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f');


------------------------------------cart_item -----------------------------
INSERT INTO cart_item(id,cart_id,product_id,price,discount,quantity)VALUES
('70dfb852-0925-44e9-b09b-4d7b07935cf9','07426572-9679-435c-a973-70e24a508ce7','0047da41-5e33-460a-88da-5cfa2b9d8724','12.99','0','2');



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
INSERT INTO offer_notification(id,receiver_id,message,store_id,product_id)VALUES
('576f249f-a18c-4901-8cde-c9f8eadddb3c','fca8e07b-ac7d-4ce8-8437-53c54ca85857','swwwwwww','72280f37-2ca7-4808-90d2-3ecec783b163','0047da41-5e33-460a-88da-5cfa2b9d8724');


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
