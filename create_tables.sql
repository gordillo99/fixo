create table areas (id int primary key, description varchar(255) not null);
create table categories (id int primary key unique, description varchar(255) not null);
create table users (id varchar(255) primary key unique, firstname varchar(255) not null, lastname varchar(255) not null, email varchar(255) not null, age int, gender int, address varchar(255) not null, profilepic bytea, usertype varchar(12) not null);
create table fixers (id bigserial primary key, firstname varchar(255) not null, lastname varchar(255) not null, phone varchar(255) not null, email varchar(255) not null, age int, gender int, description varchar(255) not null, profilepic bytea);
create table fixers_to_areas (id bigserial primary key, fixer_id int references fixers(id) ON DELETE CASCADE, area_id int references areas(id));
create table fixers_to_categories (id bigserial primary key unique, fixer_id int references fixers(id) ON DELETE CASCADE, category_id int references categories(id));
create table proposals (id bigserial primary key, user_id varchar(255) references users(id) ON DELETE CASCADE, fixer_id int references fixers(id) ON DELETE CASCADE, area int references areas(id), address varchar(255), email varchar(255), phone_number varchar(20), prop_date date, morning int, category varchar(30), created_at date, status int not null, has_review varchar(5) not null default 'no');
create table dates_to_proposals (id bigserial primary key, proposal_id int references proposals(id) ON DELETE CASCADE, prop_date varchar(5) not null, prop_time varchar(5) not null, prop_mins varchar(5) not null, prop_ampm varchar(5) not null);
create table add_questions_txt (id bigserial primary key, proposal_id int references proposals(id) ON DELETE CASCADE, question varchar(255) not null, answer varchar(255) not null);
create table add_questions_image (id bigserial primary key, proposal_id int references proposals(id) ON DELETE CASCADE, question varchar(255) not null, answer bytea not null);
create table reviews (id bigserial primary key unique, proposal_id int references proposals(id) ON DELETE CASCADE, user_id varchar(50) references users(id) ON DELETE CASCADE, fixer_id int references fixers(id) ON DELETE CASCADE, rating smallint not null, comment varchar(255));
insert into  categories (id, description) values (1, 'gardening');
insert into  categories (id, description) values (2, 'carpentry');
insert into  categories (id, description) values (3, 'painting');
insert into  categories (id, description) values (4, 'electricity');
insert into  categories (id, description) values (5, 'plumbing');
insert into  areas (id, description) values (1, 'Zona 1');
insert into  areas (id, description) values (2, 'Zona 2');
insert into  areas (id, description) values (3, 'Zona 3');
insert into  areas (id, description) values (4, 'Zona 4');
insert into  areas (id, description) values (5, 'Zona 5');
insert into  areas (id, description) values (6, 'Zona 6');
insert into  areas (id, description) values (7, 'Zona 7');
insert into  areas (id, description) values (8, 'Zona 8');
insert into  areas (id, description) values (9, 'Zona 9');
insert into  areas (id, description) values (10, 'Zona 10');
insert into  areas (id, description) values (11, 'Zona 11');
insert into  areas (id, description) values (12, 'Zona 12');
insert into  areas (id, description) values (13, 'Zona 13');
insert into  areas (id, description) values (14, 'Zona 14');
insert into  areas (id, description) values (15, 'Zona 15');
insert into  areas (id, description) values (16, 'Zona 16');
insert into  areas (id, description) values (17, 'Zona 17');
insert into  areas (id, description) values (18, 'Zona 18');
insert into  areas (id, description) values (19, 'Zona 19');
insert into  areas (id, description) values (20, 'Mixco');
insert into  areas (id, description) values (21, 'Zona 21');
insert into  areas (id, description) values (22, 'Petapa');
insert into  areas (id, description) values (23, 'Sta. Catarina Pinula');
insert into  areas (id, description) values (24, 'San Jose Pinula');
insert into  areas (id, description) values (25, 'Fraijanes');
insert into  areas (id, description) values (26, 'Villanueva');
