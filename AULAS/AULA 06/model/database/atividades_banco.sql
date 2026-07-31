show tables;

#-------------------------------------------------------------------------------------------
# Exercício 1
# Relatório que exibe nome do autor e nome por extenso do seu sexo
#-------------------------------------------------------------------------------------------
select tbl_autor.nome as nome_autor,
	tbl_sexo.nome as nome_sexo
    from tbl_autor 
			inner join tbl_sexo
				on tbl_sexo.id = tbl_autor.id_sexo;
                
select * from tbl_autor;
select * from tbl_sexo;
#-------------------------------------------------------------------------------------------
# Exercício 2
# Consulta que lista o nome do autor e sua respectiva nacionalidade
#-------------------------------------------------------------------------------------------

select * from tbl_autor;
select * from tbl_autor_nacionalidade;

select tbl_autor.nome as nome_autor,
	   tbl_nacionalidade.nome as nacionalidade
	from tbl_autor_nacionalidade
    inner join tbl_autor
    on  tbl_autor.id = tbl_autor_nacionalidade.id_autor
    
    inner join tbl_nacionalidade
        #Chave primária       #Chave estrangeira
    on tbl_nacionalidade.id = tbl_autor_nacionalidade.id_nacionalidade;
#-------------------------------------------------------------------------------------------
# Exercício 3
# Retorna todos os autores cadastrados mas que não possuem obras vinculadas
#-------------------------------------------------------------------------------------------
show tables;
select * from tbl_autor;
select * from tbl_livro;
select * from tbl_livro_autor;

select tbl_autor.nome as nome_autor,
	   tbl_livro.titulo as nome_livro
	from tbl_livro_autor 
    right join tbl_autor
    on tbl_autor.id = tbl_livro_autor.id_autor
    
    left join tbl_livro
    on tbl_livro.id = tbl_livro_autor.id_livro
	
    order by tbl_livro.titulo desc;
    
#A tabela declarada primeiro no from é a right
##caso queira priorizar a segunda tabela, usar o left (que traz os nulos)

#-------------------------------------------------------------------------------------------
# Exercício 4
# Retorna todos os gêneros cadastrados e os títulos dos livros associados a eles
# Inclusive os gêneros que não possuem livros atrelados a eles
#-------------------------------------------------------------------------------------------
select * from tbl_genero;
select * from tbl_livro;
select * from tbl_livro_genero;

select tbl_genero.genero as nome_genero,
	   tbl_livro.titulo as nome_livro
from tbl_livro_genero
	right join tbl_genero 
	on tbl_genero.id = tbl_livro_genero.id_genero

	left join tbl_livro
    on tbl_livro.id = tbl_livro_genero.id_livro

    order by tbl_genero.genero desc;
    
#-------------------------------------------------------------------------------------------
# Exercício 5
# Retorna o título do livro, nome do autor principal e o nome da editora que publicou
#-------------------------------------------------------------------------------------------
select * from tbl_livro;
select * from tbl_autor;
select * from tbl_editora;
select * from tbl_livro_autor;
select * from tbl_livro_editora;
show tables;

select tbl_livro.titulo as titulo_livro,
		tbl_editora.nome as nome_editora,
        tbl_autor.nome as nome_autor
        
from tbl_livro
	inner join tbl_livro_editora
		on tbl_livro.id = tbl_livro_editora.id_livro
	inner join tbl_editora
		on tbl_editora.id = tbl_livro_editora.id_editora
    inner join tbl_livro_autor
		on tbl_livro.id = tbl_livro_autor.id_livro
    inner join tbl_autor
		on tbl_autor.id = tbl_livro_autor.id_autor
	  ;
    
#-------------------------------------------------------------------------------------------
# Exercício 6
# Retorna título do livro, tipo de acabamento e o país de origem
#-----------------------------------------------------------------------------------------
select * from tbl_livro;
select * from tbl_acabamento;
select * from tbl_pais_origem;
show tables;

select  tbl_livro.titulo as titulo_livro,
		tbl_acabamento.tipo as tipo_acabamento,
		tbl_pais_origem.pais as pais_origem
        
from tbl_livro 
	inner join tbl_acabamento
		on tbl_acabamento.id = tbl_livro.id_acabamento
	inner join tbl_pais_origem
		on tbl_pais_origem.id = tbl_livro.id_pais_origem;

#-------------------------------------------------------------------------------------------
# Exercício 7
# Retorna título do livro e biografia mas o resultado deve trazer apenas obras
#que pertençam ao gênero 'Terror ou Horror'.
#-------------------------------------------------------------------------------------------
select * from tbl_genero;
select * from tbl_livro;
select * from tbl_livro_genero;
show tables;

select tbl_livro.titulo as titulo_livro,
		tbl_livro.biografia as biografia,
        tbl_genero.genero as nome_genero
        
        from tbl_livro
			inner join tbl_livro_genero
				on tbl_livro.id = tbl_livro_genero.id_livro
			inner join tbl_genero
				on tbl_genero.id = tbl_livro_genero.id_genero
				where tbl_genero.id = 5;
        
#-------------------------------------------------------------------------------------------
# Exercício 8
# Retorna todas as informações do ecossistema
#-------------------------------------------------------------------------------------------
select * from tbl_livro;
select * from tbl_acabamento;
desc tbl_livro;
show tables;

select tbl_livro.titulo as titulo_livro,
	   tbl_livro.valor as valor,
       tbl_livro.qtde_paginas as qtde_paginas,
       tbl_livro.data_publicacao as data_publicacao,
       tbl_livro.isbn as codigo_isbn,
       
       tbl_acabamento.tipo as tipo_acabamento
       
from tbl_livro 
	inner join tbl_acabamento
		on tbl_acabamento.id = tbl_livro.id_acabamento
	inner join tbl_
        
		