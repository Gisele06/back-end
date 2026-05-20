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

insert into tbl_genero(
genero
)values(
'terror'
);

create table tbl_classificacao(
id 				int not null auto_increment primary key,
classificacao 	varchar(2) not null
);

insert into tbl_classificacao(
	classificacao
)values
('L'),
('10'),
('12'),
('14'),
('16'),
('18')
;

#CASE serve para criar condições no SQL: WHEN define a condição, 
#THEN diz o que acontece se ela for verdadeira, 
#ELSE define o resultado caso nenhuma condição seja atendida.
#END serve para finalizar o bloco do CASE, indicando onde a estrutura de condição termina.
select 
    classificacao,
    concat( 'Classificação: ', case when classificacao = 'L'
			then 'Livre para todos os públicos' 
            else concat( 'Não recomendado para menores de ', classificacao, ' anos')
			END
    ) as descricao
from tbl_classificacao;

delete from tbl_filme;

select * from tbl_classificacao;
alter table tbl_filme 
	add column id_classificacao int not null, 
    add constraint FK_CLASSIFICACAO_FILME
		foreign key(id_classificacao)
        references tbl_classificacao(id);
    
select * from tbl_classificacao;
	alter table tbl_classificacao
		change column classificacao sigla varchar(3),
		add column descricao varchar(40) not null,
		add column nome varchar(10) not null;
        
        select * from tbl_classificacao;
			
            
    

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
insert into tbl_ator(
nome,
nome_completo,
biografia,
url_foto,
idade,
data_nascimento,
anos_de_carreira,
quantidade_filmes_feitos
)values(
'Meryl Streep',
'Mary Louise Streep',
'blablablablabla',
'http:/fotodaatriz.com.br',
'76',
'1949-06-22',
'49',
'78'
);

show tables;
desc tbl_ator;

select * from tbl_filme;

#Insert

#Insert único
insert into tbl_filme(	nome, 
						sinopse, 
                        capa, 
                        data_lancamento, 
                        duracao,
                        valor,
                        avaliacao
                        )values(
						'O Rei da Internet',
                        'Inspirado na vida de Daniel Nascimento, que ficou conhecido como “O Rei da Internet” é uma aventura dramática que conta como Daniel, interpretado aqui por João Guilherme, se destacou como um dos maiores hackers do Brasil. Além de ter feito parte de uma organização criminosa que movimentou milhões de reais, ter vivido intensamente uma vida de ostentação e ter sido alvo de operação da Polícia Federal. Tudo isso antes de completar 17 anos.',
                        'https://br.web.img2.acsta.net/c_310_420/img/52/e8/52e8eef82b8842cbc893bd8b2ff02907.jpg',
                        '2026-05-14',
                        '02:15',
						'66.6',
                        '3'
                        );
                        
#Insert de múltiplos valores

insert into tbl_filme(	nome, 
						sinopse, 
                        capa, 
                        data_lancamento, 
                        duracao,
                        valor,
                        avaliacao
                        )values(
						'Michael',
                        'Michael é uma cinebiografia musical sobre o rei do pop Michael Jackson. O longa retrata a vida e o legado do cantor (Jaafar Jackson), desde a descoberta de seu espetacular talento como líder do Jackson Five até o impacto cultural de sua visão artística ímpar. Para além da música, este drama biográfico traça as ambições criativas de um homem que buscou ativamente se tornar um dos maiores artistas do mundo, destacando os passos dados por Jackson fora dos palcos. Performances icônicas de sua carreira solo, ainda, compõem esse retrato íntimo e nunca antes visto do artista.',
                        'https://br.web.img3.acsta.net/c_310_420/img/e9/f1/e9f1efa99c6af0bbe48871b6d0a299f9.jpg',
                        '2026-04-23',
                        '02:08',
						'70',
                        '3'
                        ),
                        (
						'Mortal Kombat II',
                        'Mortal Kombat II segue sendo uma adaptação da série de videogames, e agora, irá acompanhar os famosos campeões ao lado do próprio Johnny Cage. Em uma nova disputa entre as forças do Plano Terreno e regime tirânico de Shao Kahn, eles terão que buscar o equilíbrio entre os reinos e viver lutas intensas. Com heróis e antigos rivais sendo obrigados a se unirem, uma batalha sangrenta e decisiva irá determinar o destino de todos os habitantes.',
                        'https://br.web.img3.acsta.net/c_310_420/img/ec/fb/ecfb3f4dfbeb1e0145b0840fc3a2c663.png',
                        '2026-05-7',
                        '01:56',
						'40',
                        '4'
                        ),
                        (
						'O Gênio do Crime',
						'O Gênio do Crime acompanha um grupo de amigos que passa a investigar um esquema de falsificação de figurinhas da Copa do Mundo em São Paulo. Durante o evento, colecionar o álbum de figurinhas da competição é a maior febre no Colégio Tres Bandeiras. Gordo é o líder de um grupo que está empenhado em completar o álbum. O problema é que uma operação de figurinhas falsas entra no caminho dos amigos. Agora, com a ajuda de seus colegas, em especial a esperta Berenice, por quem Gordo se apaixona, o jovem colecionador precisará desvendar esse mistério repleto de suspense, aventura e humor.' ,                       
                        'https://br.web.img2.acsta.net/c_310_420/img/0d/ef/0defa190b9015d78841fcc41da3b0453.png',
                        '2026-05-14',
                        '01:30',
						'66.6',
                        '3'
                        ),
                        (
						'Authentic Games no Império Desconectado',
                        'Michael é uma cinebiografia musical sobre o rei do pop Michael Jacksonva. O longa retrata a vida e o legado do cantor (Jaafar Jackson), desde a descoberta de seu espetacular talento como líder do Jackson Five até o impacto cultural de sua visão artística ímpar. Para além da música, este drama biográfico traça as ambições criativas de um homem que buscou ativamente se tornar um dos maiores artistas do mundo, destacando os passos dados por Jackson fora dos palcos. Performances icônicas de sua carreira solo, ainda, compõem esse retrato íntimo e nunca antes visto do artista.',
                        'https://br.web.img3.acsta.net/c_310_420/commons/v9/common/empty/empty_portrait.png',
                        '2026-05-14',
                        '01:11',
						'20',
                        '5'
                        );
                        
update tbl_filme set nome = 'Filme de teste' where id = 5;
update tbl_filme set capa = 'abababbaba';

#Delete
delete from tbl_filme where id = 40;


#Select
#o * retorna todas as colunas 
select * from tbl_filme;
select tbl_filme.* from tbl_filme; 

select nome, sinopse, capa from tbl_filme;
select tbl_filme.nome, tbl_filme.sinopse, tbl_filme.capa from tbl_filme;

#AS -> alias (apelido)
select filme.nome as nome_filme, filme.sinopse as sinopse_filme
from tbl_filme as filme;

#Ordenação de dados Crescente ou Decrescente
#Crescente
select * from tbl_filme order by nome;
select * from tbl_filme order by nome asc;
#Decrescente
select * from tbl_filme order by nome desc;
select * from tbl_filme order by nome desc;

#Like
select * from tbl_filme where nome = 'Michael';
select * from tbl_filme where nome = 'Volta para o Futuro';
#Retorna a igualdade (parecido com o igual)
select * from tbl_filme where nome like 'Futuro';

#Retorna filmes que terminam com a palavra
select * from tbl_filme where nome like 'Futuro%';

#Retorna filmes que começam com a palavra
select * from tbl_filme where nome like '%Futuro';

#Retorna filmes que contenham a palavra em qualquer parte do atributo
select * from tbl_filme where nome like '%Futuro%';

#Operadores lógicos
#AND
#OR
#NOT

#Ordem de processamento dos operadores lógicos
# 1° ()
# 2° Not
# 3° AND
# 4° OR

select * from  tbl_filme 
	where nome  like '%crime%' or
		sinopse like '%crime%'
;

select * from tbl_filme 
	where data_lancamento >= '2026-01-01' and
		  data_lancamento <= '2026-12-31'
;

select * from tbl_filme
	where 	(duracao >= '02:00' or
			nome like 'F%') and
            data_lancamento >= '2010-01-01'
;

#IN -> Permite encaminhar uma lista de opções, utilizar apenas para substituir 
select * from tbl_filme 
	where id = 2 or id = 4 or id = 10 or id = 12 or id = 20 or id = 21
;

select * from tbl_filme where id not in(2,4,10,12,41,21,22);

#Comandos para trabalhar com String
#Ucase() -> MAIUSCULO e Lcase() -> minusculo
#length() -> Retorna a quantidade de caracteres
#concat() -> Permite concatenar conteudos
#substr() -> Permite limitar a qtde de caracteres de uma string

select ucase(nome) as nome_titulo, lcase(nome) as nome_lista, 
	length(nome) as qtde_nome,
    concat('Nome: ', nome) as nome_formatado,
    concat('O filme ', nome, ' tem a sinopse ', sinopse) as filme_sinopse, 
	concat(substr(sinopse, 1, 20), '... <a href="detalhes.html">leia mais</a>') as sinopse_formatada,	
    sinopse, data_lancamento, duracao
	from tbl_filme
;

#Trabalhando com valores (Calculos matemáticos, etc)

#Retorna a qtde de registros
select count(*) as qtde_filmes from tbl_filme;

#Retorna a soma de valores de uma coluna
select sum(valor) as Total from tbl_filme;

#round() -> Limita e arredonda a qtde de casas decimais
#avg() -> retorna a média de valores

select concat('R$ ', round(avg(valor),2)) as media from tbl_filme;

select * from tbl_classificacao