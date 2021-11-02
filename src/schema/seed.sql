
-------------------------- Users Table ----------------------------------
INSERT INTO users(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES 
('2fa53b27-a3d7-406f-9f91-c7f3950e9078','emranaloul@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0798009950','jordan','amman','emran','aloul','aa25ss568165asffjs','kjaffjjsu8s5895s',true);
INSERT INTO users(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES
 ('4b9a4f7b-6c1c-4039-9e29-26909a63021c','amjadmesmar@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','0796750891','jordan','irbid','amjad','mesmar','aa25ss86816fff5ajs','kjajfgw9su85895s',true);
INSERT INTO users(id,email,user_password,country_code,mobile,country,city,first_name,last_name,verified) VALUES
 ('507f39aa-9122-4f24-8d18-d928bea2c1ba','wesam@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','009627966851','jordan','irbid','wesam','al-masri',true);
INSERT INTO users(id,email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,facebook_id,verified) VALUES 
('14a60467-c390-4ca7-a1be-5d0ee11d9ad8','aa0796780751@gmail.com','$2b$10$6q.sFV1isD9UiWmEvQRwT.Zz8f2wkTJ4m59kYi6Jlmo11MXak2NSO','962','079655780751','jordan','amman','ahmad','arman','aa25ss568165ajs','kjajjsu85895s',true);


------------------------- User File Table --------------------------------
INSERT INTO user_file(id,file) VALUES ('e9b6516a-16b8-43fd-836c-9df52dbd55e1','https://blog.photofeeler.com/wp-content/uploads/2017/09/tinder-photo-size-tinder-picture-size-tinder-aspect-ratio-image-dimensions-crop.jpg');
INSERT INTO user_file(id,file) VALUES ('3b47e66c-690b-4eb2-8c24-4f0117c9ab83','https://static.independent.co.uk/2021/04/05/12/SWNS_SOCIETY_PHOTOS_03.jpg?width=982&height=726&auto=webp&quality=75');
INSERT INTO user_file(id,file) VALUES ('5f04b02b-a142-4445-a65f-bf5542d1fbd4','https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-most-beautiful-places-matterhorn.jpg');
INSERT INTO user_file(id,file) VALUES ('b6d0861e-90ac-48d6-9460-5aed8515ecbf','https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-store.jpg');
INSERT INTO user_file(id,file) VALUES ('0047da41-5e33-460a-88da-5cfa2b9d8724','https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-store.jpg');

      
-------------------------- profiles Table --------------------------------
INSERT INTO profiles(id,user_id,first_name,last_name,city,country,mobile,profile_picture) VALUES
('fca8e07b-ac7d-4ce8-8437-53c54ca85857','2fa53b27-a3d7-406f-9f91-c7f3950e9078','emran','aloul','amman','jordan','0798009950','e9b6516a-16b8-43fd-836c-9df52dbd55e1');
INSERT INTO profiles(id,user_id,first_name,last_name,city,country,mobile,profile_picture) VALUES
('d7a36645-a598-4584-a158-23615a865ac9','4b9a4f7b-6c1c-4039-9e29-26909a63021c','amjad','mesmar','irbid','jordan','0796750891','3b47e66c-690b-4eb2-8c24-4f0117c9ab83');
INSERT INTO profiles(id,user_id,first_name,last_name,city,country,mobile,profile_picture) VALUES
('1821db68-97c9-4380-9a55-ad8bc7f16eda','14a60467-c390-4ca7-a1be-5d0ee11d9ad8','ahmad','arman','amman','jordan','079655780751','5f04b02b-a142-4445-a65f-bf5542d1fbd4');
INSERT INTO profiles(id,user_id,first_name,last_name,city,country,mobile) VALUES
('3be97674-8ce4-49a8-a378-605965c4b98c','507f39aa-9122-4f24-8d18-d928bea2c1ba','wesam','al-masri','irbid','jordan','009627966851');


------------------------- Stores Table ----------------------------------
INSERT INTO store(id,profile_id,store_name,city,address,mobile,caption,about,store_picture,store_rating) VALUES 
('72280f37-2ca7-4808-90d2-3ecec783b163','fca8e07b-ac7d-4ce8-8437-53c54ca85857','DK-beauty','amman','دوار الداخلية عمارة رقم 13 ','0695821','love live love dk-beauty','الجودة عالية والاسعار منافسة','b6d0861e-90ac-48d6-9460-5aed8515ecbf','5');

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
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,discount,discount_rate,price,brand_name,description,quantity) VALUES 
('0047da41-5e33-460a-88da-5cfa2b9d8724','72280f37-2ca7-4808-90d2-3ecec783b163','shoes','حذاء','boot','55556936862ls',false,'0.02','12.99','DK','boot very nive and beautiful ','5');
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,discount,discount_rate,price,brand_name,description,quantity) VALUES 
('771fea26-f56c-4e19-b842-9b136b889473','72280f37-2ca7-4808-90d2-3ecec783b163','clothing','ملايس','EXLURA Womens High Waist Polka Dot Pleated Skirt Midi Swing Skirt with Pockets','555569368s62ls',false,'0.01','5.99','DK','boot very nive and beautiful ','5');
INSERT INTO product(id,store_id,enTitle,arTitle,metaTitle,sku,discount,discount_rate,price,brand_name,description,quantity) VALUES 
('defdba13-6d21-4147-982e-6444ca9e2361','72280f37-2ca7-4808-90d2-3ecec783b163','watches','ساعات','watch very nive and beautiful','5945919951A',false,'0.01','15.99','DK','nice','5');

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
INSERT INTO product_pictures(id,product_id,product_picture) VALUES 
('b7f0ab0c-1b3a-405c-8935-fea9232e0f28','0047da41-5e33-460a-88da-5cfa2b9d8724','0047da41-5e33-460a-88da-5cfa2b9d8724');


------------------------------ store_picture -----------------------------------------
INSERT INTO store_picture (id,store_id,store_picture) VALUES 
('8f236701-30e5-4277-9bc8-cec66d21aae0','72280f37-2ca7-4808-90d2-3ecec783b163','0047da41-5e33-460a-88da-5cfa2b9d8724');



-------------------------------- store_reviews -----------------------------------
INSERT INTO store_reviews(id,profile_id,store_id,review,rate,votes)VALUES
('cda2e641-a419-444a-b8d7-65ce8ff3d0cd','3be97674-8ce4-49a8-a378-605965c4b98c','72280f37-2ca7-4808-90d2-3ecec783b163','the store is very good offers ','4.3','24K');


--------------------------------- new_order ----------------------------------------
INSERT INTO new_order(id,profile_id,first_name,last_name,status,tax,shipping,discount,sub_total,grand_total,mobile,city,country)VALUES
('82e018d1-b731-489c-a62b-f719cdf4bb8b','fca8e07b-ac7d-4ce8-8437-53c54ca85857','emran','aloul','pending','0.01','0.02','0','20','22','0798009950','amman','jordan');


-------------------------------- order_item ----------------------------------------
INSERT INTO order_item (id,order_id,product_id,price,discount,quantity)Values
('39d9e68f-98a3-4347-b961-2c5bb4db1c26','82e018d1-b731-489c-a62b-f719cdf4bb8b','0047da41-5e33-460a-88da-5cfa2b9d8724','12.99','0','3');


-------------------------------- transaction ----------------------------
INSERT INTO transaction(id,profile_id,order_id,code,type,mode,status)VALUES 
('b90a2a5a-891d-4baa-b63a-01bce1ee570d','fca8e07b-ac7d-4ce8-8437-53c54ca85857','82e018d1-b731-489c-a62b-f719cdf4bb8b','55456186222s6','mastercard','Read-Only','approved');


----------------------------------address -----------------------------
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','fca8e07b-ac7d-4ce8-8437-53c54ca85857','jordan','amman','emran','aloul','0798009950','abdallah alnazhan','13','2');
INSERT INTO address(id,profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number)VALUES 
('9e0e31ac-757b-4f25-afe1-61ed9ccb40d2','fca8e07b-ac7d-4ce8-8437-53c54ca85857','uae','dubai','emran','aloul','0798009950','abdallah alnazhan','13','8');

---------------------------------- cart -----------------------------
INSERT INTO cart(id,profile_id,address_id,first_name,last_name,mobile)VALUES 
('07426572-9679-435c-a973-70e24a508ce7','fca8e07b-ac7d-4ce8-8437-53c54ca85857','7c0c7345-9c9a-4697-9eec-5618cf4dbf8f','emran','aloul','0798009950');


------------------------------------cart_item -----------------------------
INSERT INTO cart_item(id,cart_id,product_id,price,discount,quantity)VALUES
('70dfb852-0925-44e9-b09b-4d7b07935cf9','07426572-9679-435c-a973-70e24a508ce7','0047da41-5e33-460a-88da-5cfa2b9d8724','12.99','0','2');



------------------------------- jwt ----------------------------------
INSERT INTO jwt (id,user_id,access_token,refresh_token)VALUES 
('44b54ebd-44a4-4733-81ea-3af2be8a3d93','2fa53b27-a3d7-406f-9f91-c7f3950e9078','aaa','sss');


-------------------------------- follow ----------------------------
INSERT INTO follow(id,store_id,follower)VALUES 
('792d59a3-34b8-4838-8765-af9afe69e158','72280f37-2ca7-4808-90d2-3ecec783b163','fca8e07b-ac7d-4ce8-8437-53c54ca85857');


---------------------------------- attachment ---------------------
INSERT INTO attachment(id,file_id)VALUES 
('5b5ae572-59a1-45cf-8cdf-4f642340f1b9','e9b6516a-16b8-43fd-836c-9df52dbd55e1');


-----------------------------------comment ----------------
INSERT INTO comment(id,comment,product_id,profile_id,store_id)VALUES 
('7a22194e-d7bc-417d-ba87-bec1c008ae1d','jhedjbbedwde','0047da41-5e33-460a-88da-5cfa2b9d8724','fca8e07b-ac7d-4ce8-8437-53c54ca85857','72280f37-2ca7-4808-90d2-3ecec783b163');


------------------------------offer_notification -------------------
INSERT INTO offer_notification(id,receiver_id,message,store_id,product_id)VALUES
('576f249f-a18c-4901-8cde-c9f8eadddb3c','fca8e07b-ac7d-4ce8-8437-53c54ca85857','swwwwwww','72280f37-2ca7-4808-90d2-3ecec783b163','0047da41-5e33-460a-88da-5cfa2b9d8724');


---------------------------- order_notification --------------------------------
INSERT INTO order_notification(id,receiver_id,order_id,message)VALUES
('6007f70b-2afa-46a9-a6cc-777b224700be','72280f37-2ca7-4808-90d2-3ecec783b163','82e018d1-b731-489c-a62b-f719cdf4bb8b','hduwegewgdsgdsgdsaaa');

