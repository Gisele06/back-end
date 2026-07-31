use db_filmes_20261_b;

insert into tbl_classificacao (sigla, nome, descricao) values
('L', 'Livre', 'Livre para todos os públicos'),
('10', '10 anos', 'Não recomendado para menores de 10 anos'),
('12', '12 anos', 'Não recomendado para menores de 12 anos'),
('14', '14 anos', 'Não recomendado para menores de 14 anos'),
('16', '16 anos', 'Não recomendado para menores de 16 anos'),
('+18', '18 anos', 'Não recomendado para menores de 18 anos');

insert into tbl_genero (nome) values
('Terror'),
('Ação'),
('Animação'),
('Drama'),
('Aventura');

insert into tbl_atividade (atividade) values
('Ator'),
('Atriz'),
('Diretor'),
('Roteirista'),
('Produtor');

insert into tbl_nacionalidade (nacionalidade) values
('Brasileira'),
('Norte-Americana'),
('Japonesa'),
('Britânica');

insert into tbl_trailer (titulo, url_video, data_publicacao) values
('Trailer Oficial - Super Mario Galaxy', 'https://www.youtube.com/watch?v=abc123', '2026-03-20'),
('Trailer Oficial - Michael', 'https://youtu.be/u1HARE7V4UU?si=tHhL5bNUeAQlsGrn', '2026-03-15'),
('Trailer Oficial - Mortal Kombat II', 'https://youtu.be/0HnnNgHqo7I?si=a3YvFau8Q2xY55R2', '2026-04-01');

insert into tbl_pessoa (nome, nome_completo, biografia, url_foto, idade, data_nascimento, anos_de_carreira, quantidade_filmes_feitos) values
('João Guilherme', 'João Guilherme Ávila Costa', 'Ator e cantor brasileiro.', 'https://foto-joao-guilherme.jpg', 24, '2002-02-01', 12, 15),
('Jaafar Jackson', 'Jaafar Jeremiah Jackson', 'Cantor, dançarino e ator norte-americano.', 'https://foto-jaafar-jackson.jpg', 29, '1996-07-25', 8, 2),
('Karl Urban', 'Karl-Heinz Urban', 'Ator neozelandês famoso por seus papéis em filmes de ação e ficção científica.', 'https://foto-karl-urban.jpg', 54, '1972-06-07', 30, 40);

insert into tbl_filme (nome, sinopse, capa, data_lancamento, duracao, valor, avaliacao, id_classificacao) values
(
    'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    50.60,
    2.00,
    1
),
(
    'O Rei da Internet',
    'Inspirado na vida de Daniel Nascimento, que ficou conhecido como "O Rei da Internet" é uma aventura dramática que conta como Daniel, interpretado aqui por João Guilherme, se destacou como um dos maiores hackers do Brasil. Além de ter feito parte de uma organização criminosa que movimentou milhões de reais, ter vivido intensamente uma vida de ostentação e ter sido alvo de operação da Polícia Federal. Tudo isso antes de completar 17 anos.',
    'https://br.web.img2.acsta.net/c_310_420/img/52/e8/52e8eef82b8842cbc893bd8b2ff02907.jpg',
    '2026-05-14',
    '02:15:00',
    66.60,
    3.00,
    4
),
(
    'Michael',
    'Michael é uma cinebiografia musical sobre o rei do pop Michael Jackson. O longa retrata a vida e o legado do cantor (Jaafar Jackson), desde a descoberta de seu espetacular talento como líder do Jackson Five até o impacto cultural de sua visão artística ímpar. Para além da música, este drama biográfico traça as ambições criativas de um homem que buscou ativamente se tornar um dos maiores artistas do mundo, destacando os passos dados por Jackson fora dos palcos. Performances icônicas de sua carreira solo, ainda, compõem esse retrato íntimo e nunca antes visto do artista.',
    'https://br.web.img3.acsta.net/c_310_420/img/e9/f1/e9f1efa99c6af0bbe48871b6d0a299f9.jpg',
    '2026-04-23',
    '02:08:00',
    70.00,
    3.00,
    3
),
(
    'Mortal Kombat II',
    'Mortal Kombat II segue sendo uma adaptação da série de videogames, e agora, irá acompanhar os famosos campeões ao lado do próprio Johnny Cage. Em uma nova disputa entre as forças do Plano Terreno e regime tirânico de Shao Kahn, eles terão que buscar o equilíbrio entre os reinos e viver lutas intensas. Com heróis e antigos rivais sendo obrigados a se unirem, uma batalha sangrenta e decisiva irá determinar o destino de todos os habitantes.',
    'https://br.web.img3.acsta.net/c_310_420/img/ec/fb/ecfb3f4dfbeb1e0145b0840fc3a2c663.png',
    '2026-05-07',
    '01:56:00',
    40.00,
    4.00,
    5
);

insert into tbl_filme_genero (id_filme, id_genero) values
(1, 3),
(1, 5),
(2, 4),
(3, 4),
(4, 2);

insert into tbl_filme_trailer (id_filme, id_trailer) values
(1, 1),
(3, 2),
(4, 3);

insert into tbl_pessoa_nacionalidade (id_pessoa, id_nacionalidade) values
(1, 1),
(2, 2),
(3, 2);

insert into tbl_pessoa_atividade (id_pessoa, id_atividade) values
(1, 1),
(1, 4),
(2, 1),
(3, 1),
(3, 3);

insert into tbl_pessoa_filme (id_pessoa, id_filme) values
(1, 2),
(2, 3),
(3, 4);