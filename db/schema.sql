DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
drop table if exists voters;

create table parties (
    id integer auto_increment primary key,
    name varchar(50) not null,
    description text
);

-- CREATE TABLE candidates (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     industry_connected BOOLEAN NOT NULL
-- );
create table voters (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    email varchar(50) not null,
    created_at datetime default current_timestamp
);

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);