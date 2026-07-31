create database db_filmes_20261_b;
use db_filmes_20261_b;

create table tbl_classificacao (
    id int not null auto_increment primary key,
    sigla varchar(3) not null,
    nome varchar(10) not null,
    descricao varchar(40) not null
);

create table tbl_genero (
    id int not null auto_increment primary key,
    nome varchar(15) not null
);

create table tbl_atividade (
    id int not null auto_increment primary key,
    atividade varchar(50) not null
);

create table tbl_nacionalidade (
    id int not null auto_increment primary key,
    nacionalidade varchar(20) not null
);

create table tbl_trailer (
    id int not null auto_increment primary key,
    titulo varchar(100) not null,
    url_video varchar(255) not null,
    data_publicacao date not null
);

create table tbl_pessoa (
    id int not null auto_increment primary key,
    nome varchar(100) not null,
    nome_completo varchar(100) default null,
    biografia text default null,
    url_foto varchar(255) default null,
    idade int default null,
    data_nascimento date default null,
    anos_de_carreira int default null,
    quantidade_filmes_feitos int default 0
);

create table tbl_filme (
    id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    capa varchar(255) not null,
    data_lancamento date not null,
    duracao time not null,
    valor decimal(5,2) default 0.00,
    avaliacao decimal(3,2) default null,
    id_classificacao int not null,
    constraint FK_CLASSIFICACAO_FILME
        foreign key (id_classificacao)
        references tbl_classificacao(id)
        on delete cascade
);

create table tbl_filme_genero (
    id int not null auto_increment primary key,
    id_genero int not null,
    id_filme int not null,
    constraint FK_FILME_FILMEGENERO
        foreign key (id_filme)
        references tbl_filme(id)
        on delete cascade,
    constraint FK_GENERO_FILMEGENERO
        foreign key (id_genero)
        references tbl_genero(id)
        on delete cascade
);

create table tbl_filme_trailer (
    id int not null auto_increment primary key,
    id_trailer int not null,
    id_filme int not null,
    constraint FK_TRAILER_FILME_TRAILER
        foreign key (id_trailer)
        references tbl_trailer(id)
        on delete cascade,
    constraint FK_FILME_FILME_TRAILER
        foreign key (id_filme)
        references tbl_filme(id)
        on delete cascade
);

create table tbl_pessoa_nacionalidade (
    id int not null auto_increment primary key,
    id_pessoa int not null,
    id_nacionalidade int not null,
    constraint FK_PESSOA_NACIONALIDADE
        foreign key (id_pessoa)
        references tbl_pessoa(id)
        on delete cascade,
    constraint FK_NACIONALIDADE_PESSOA
        foreign key (id_nacionalidade)
        references tbl_nacionalidade(id)
        on delete cascade
);

create table tbl_pessoa_atividade (
    id int not null auto_increment primary key,
    id_pessoa int not null,
    id_atividade int not null,
    constraint FK_PESSOA_ATIVIDADE
        foreign key (id_pessoa)
        references tbl_pessoa(id)
        on delete cascade,
    constraint FK_ATIVIDADE_PESSOA
        foreign key (id_atividade)
        references tbl_atividade(id)
        on delete cascade
);

create table tbl_pessoa_filme (
    id int not null auto_increment primary key,
    id_pessoa int not null,
    id_filme int not null,
    constraint FK_PESSOA_FILME
        foreign key (id_pessoa)
        references tbl_pessoa(id)
        on delete cascade,
    constraint FK_FILME_PESSOA
        foreign key (id_filme)
        references tbl_filme(id)
        on delete cascade
);