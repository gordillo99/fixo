
USERS
create table users (id varchar(255) primary key unique, firstname varchar(255) not null, lastname varchar(255) not null, email varchar(255) not null, age int, gender int, address varchar(255) not null, profilepic bytea, usertype varchar(12) not null);

insert into users (id, firstname, lastname, email, age, gender, address, profilepic, usertype) VALUES (’343234’, ’Jose', 'Gordillo', 'jj@gmail.com', 23, 0, 'mi casa’, null, 0);

FIXERS
create table fixers (id bigserial primary key, firstname varchar(255) not null, lastname varchar(255) not null, phone varchar(255) not null, email varchar(255) not null, age int, gender int, description varchar(255) not null, profilepic bytea);

insert into fixers (firstname, lastname, phone, email, age, gender, profilepic) VALUES ('Yoly', 'Flores', '64648093','thatemai456l@gmail.com', 25, 1, NULL);

FIXERS_TO_AREAS
create table fixers_to_areas (id bigserial primary key, fixer_id int references fixers(id) ON DELETE CASCADE, area_id int references areas(id));

FIXERS_TO_CATEGORIES
create table fixers_to_categories (id bigserial primary key unique, fixer_id int references fixers(id) ON DELETE CASCADE, category_id int references categories(id));

AREAS
create table areas (id int primary key, description varchar(255) not null);

insert into areas (id, description) values (26, 'Villanueva');

CATEGORIES
create table categories (id int primary key unique, description varchar(255) not null);

insert into categories (id, description) values (1, 'gardening');

PROPOSALS
create table proposals (id bigserial primary key, user_id varchar(255) references users(id) ON DELETE CASCADE, fixer_id int references fixers(id) ON DELETE CASCADE, area int references areas(id), address varchar(255), email varchar(255), phone_number varchar(20), prop_date date, morning int, category varchar(30), created_at date, status int not null, has_review varchar(5) not null default 'no');

	#possible states:
	0 fixer has not been notified
	1 fixer notified

DATES_TO_PROPOSALS
create table dates_to_proposals (id bigserial primary key, proposal_id int references proposals(id) ON DELETE CASCADE, prop_date varchar(5) not null, prop_time varchar(5) not null, prop_mins varchar(5) not null, prop_ampm varchar(5) not null);

ADD_QUESTIONS_TXT
create table add_questions_txt (id bigserial primary key, proposal_id int references proposals(id) ON DELETE CASCADE, question varchar(255) not null, answer varchar(255) not null);

ADD_QUESTIONS_IMAGE
create table add_questions_image (id bigserial primary key, proposal_id int references proposals(id) ON DELETE CASCADE, question varchar(255) not null, answer bytea not null);

REVIEWS
create table reviews (id bigserial primary key unique, proposal_id int references proposals(id) ON DELETE CASCADE, user_id varchar(50) references users(id) ON DELETE CASCADE, fixer_id int references fixers(id) ON DELETE CASCADE, rating smallint not null, comment varchar(255));

OFFER
create table offers (id bigserial primary key unique, proposal_id int references proposals(id) ON DELETE CASCADE, user_id varchar(255) references users(id) ON DELETE CASCADE, fixer_id int references fixers(id) ON DELETE CASCADE, actual_date date, actual_time varchar(10) not null, am_pm varchar(2) not null, cost decimal not null, state int not null);

	#possible states:
	0 draft
	1 offer email sent to user
	2 offer accepted by user
	3 offer refused by user

TODOs:

	make login page nicer (not a robot)
	improve error page (we need a fixer here)
	add describe problem to all categories (update questions)
	implement scheduler workaround http://www.spacjer.com/blog/2014/02/10/defining-node-dot-js-task-for-heroku-scheduler/
	investigate ssl and https (lets encrypt)
	add caching to fetching

	figure out all fixer info that should be displayed
	add right text to terms and contact
	add all form validation (includes: enforce database entries max-string length)
	security measures for website

alternative to google analytics
https://piwik.org/

