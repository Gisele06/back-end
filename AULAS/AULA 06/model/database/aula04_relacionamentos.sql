use db_filmes_20261_b;

select * from tbl_classificacao;
select * from tbl_filme;

select tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.duracao, 
	   tbl_classificacao.nome as nome_classificacao
from tbl_filme
		inner join tbl_classificacao
			on tbl_classificacao.id = tbl_filme.id_classificacao