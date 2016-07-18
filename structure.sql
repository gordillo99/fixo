
USERS
create table users (id varchar(255) primary key unique, firstname varchar(255) not null, lastname varchar(255) not null, email varchar(255) not null, age int, gender int, address varchar(255) not null, profilepic bytea, usertype varchar(12) not null);

insert into users (id, firstname, lastname, email, age, gender, address, profilepic, usertype) VALUES (’343234’, ’Jose', 'Gordillo', 'jj@gmail.com', 23, 0, 'mi casa’, null, 0);

FIXERS
create table fixers (id bigserial primary key, firstname varchar(255) not null, lastname varchar(255) not null, phone varchar(255) not null, email varchar(255) not null, age int, gender int, description varchar(255) not null, profilepic bytea);

insert into fixers (firstname, lastname, phone, email, age, gender, profilepic) VALUES ('Yoly', 'Flores', '64648093','thatemai456l@gmail.com', 25, 1, NULL);

AREAS
create table areas (id int primary key, description varchar(255) not null);

insert into areas (id, description) values (26, 'Villanueva');

CATEGORIES
create table categories (id int primary key unique, description varchar(255) not null);

insert into categories (id, description) values (1, 'gardening');

PROPOSALS
create table proposals (id bigserial primary key, user_id varchar(255) references users(id), fixer_id int references fixers(id), area int references areas(id), address varchar(255), email varchar(255), phone_number varchar(20), prop_date date, morning int, category varchar(30), created_at date, status int not null);

	#possible states:
	0 fixer has not been notified
	1 fixer notified

ADD_QUESTIONS_TXT
create table add_questions_txt (id bigserial primary key, proposal_id int references proposals(id), question varchar(255) not null, answer varchar(255) not null);

ADD_QUESTIONS_IMAGE
create table add_questions_image (id bigserial primary key, proposal_id int references proposals(id), question varchar(255) not null, answer bytea not null);

FIXERS_TO_AREAS
create table fixers_to_areas (id bigserial primary key, fixer_id int references fixers(id), area_id int references areas(id));

FIXERS_TO_CATEGORIES
create table fixers_to_categories (id bigserial primary key unique, fixer_id int references fixers(id), category_id int references categories(id));

OFFER
create table offers (id bigserial primary key unique, proposal_id int references proposals(id), user_id varchar(255) references users(id), fixer_id int references fixers(id), actual_date date, actual_time varchar(10) not null, am_pm varchar(2) not null, cost decimal not null, state int not null);

	#possible states:
	0 draft
	1 offer email sent to user
	2 offer accepted by user
	3 offer refused by user

TODOs:

	finish up profile view
	make client side responsive
	export proposal to several formats
	make fetching more efficient using maps
	add all form validation
	secure routes that need user login or admin only
	implement created_at in proposals
	add on delete cascade to relevant tables

