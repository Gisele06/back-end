#Permite criar um database
create database db_filmes_20261_b;

#Permite visualizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;

select * from tbl_filme;

create table tbl_filme (
	id 						int not null auto_increment primary key, 
    nome 					varchar(80) not null, 
    sinopse 				text not null,
    capa 					varchar(255) not null,
    data_lancamento 		date not null, 
    duracao 				time not null,
    valor 					decimal(5,2) default 0,
    avaliacao				decimal(3,2) default null
);

#Apaga a tabela 
drop table tbl_filme;

drop database db_filmes_20261_b;

insert into tbl_filme(
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values(
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. 
    Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação 
    e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    if("", null, 2)
);

select * from tbl_filme order by id desc;
select * from tbl_filme where id = 10;
delete from tbl_filme where id = 1;

update tbl_filme set 
	nome = 'Filme 01 - teste de atualização',
    sinopse = 'testando a atualização de filme',
    capa = 'teste',
    data_lancamento = '2026-04-29',
    duracao = '02:30:00',
    valor = '10',
    avaliacao = '2'
where id = 1;

create table tbl_atividade (
	id 			int not null auto_increment primary key, 
    atividade 	varchar(50) not null
);

create table tbl_genero (
	id 		int not null auto_increment primary key,
    genero 	varchar(15) not null
);
    
create table tbl_classificacao(
	id 				int not null auto_increment primary key,
    classificacao 	int not null
);

create table tbl_ator(
	id 							int not null auto_increment primary key,
    nome 						varchar(100) not null,
    nome_completo 				varchar(100) not null,
    biografia 					text not null,
    url_foto 					varchar(255) not null,
    idade 						int not null,
    data_nascimento 			date not null,
    anos_de_carreira 			int not null,
    quantidade_filmes_feitos 	int not null
);
