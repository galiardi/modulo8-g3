create database m8grupal2;

use m8grupal2;

create table jewel(
  id_jewel serial primary key,
  name varchar(60) not null,
  price int not null,
  weight decimal(7, 3) not null 
  -- ,links json not null
);

create table material(
  id_material serial primary key,
  name varchar(60) not null
);

create table jewel_material(
  id_jewel bigint unsigned not null,
  id_material bigint unsigned not null,
  foreign key (id_jewel) references jewel(id_jewel),
  foreign key (id_material) references material(id_material)
);

create table image(
  id_image serial primary key,
  color_url varchar(256) not null,
  grayscale_url varchar(256) not null,
  id_jewel bigint unsigned not null,
  foreign key (id_jewel) references jewel(id_jewel)
);

create table users(
  id_user serial primary key,
  name varchar(60) not null,
  email varchar(60) not null unique,
  phone varchar(20) not null -- puede incluir +
);


insert into material (name) values ('gold');
insert into material (name) values ('silver');

insert into jewel (name, price, weight) values ('jewel1', 10000, 1.5);

insert into jewel_material (id_jewel, id_material) values ((select id_jewel from jewel where name = 'jewel1'), (select id_material from material where name = 'gold'));

insert into jewel_material (id_jewel, id_material) values ((select id_jewel from jewel where name = 'jewel1'), (select id_material from material where name = 'silver'));




-- DESCARTADO POR AHORA
-- pruebas
-- estoy probando como obtener el id actual para conctenarlo para el hatoes, pero dentro de la misma consulta

-- Esto me resulta, tendre que ver si puedo convertirlo en string y concatenarlo pero me esta pareciendo engorroso, tal vez envie el id de vuelta al servidor para hacerlo alla
insert into jewel (name, price, weight, links) values ('beauty', (SELECT `AUTO_INCREMENT`
FROM  INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'm8grupal2'
AND   TABLE_NAME   = 'jewel'), 1.5, '{"self": "http://"}');

-- Pienso que esto puede no ser seguro, porque en el tiempo que demora terminar la operacion, otra persona posdria insertar algo y tomar el valor que yo voy a ocupar
insert into jewel (name, price, weight, links) values ('beauty', (SELECT last_insert_id()+1), 1.5, '{"self": "http://"}');