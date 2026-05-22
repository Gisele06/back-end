use db_filmes_20261_b;

#Retorna a data atual do servidor
select curdate() as data_atual;
select current_date() as data_atual;

#Retorna a hora atual do servidor
select curtime() as hora_atual;
select current_time() as hora_atual;

#Retorna a data e a hora atual do servidor
select current_timestamp() as data_hora_atual;

#Funções para retornar Hora, minuto ou segundo
select hour(curtime()) as hora; 
select minute(curtime()) as minuto;
select second(curtime()) as segundo;

#Função para formatar Hora
#Retorna a hora 00...23
select time_format(curtime(), '%H') as hora_formatada;

#Retorna de 00...12
select time_format(curtime(), '%h') as hora_formatada;

#Retorna o minuto
select time_format(curtime(), '%i') as hora_formatada;
#Retorna o segundo
select time_format(curtime(), '%s') as hora_formatada;

select time_format(curtime(), '%hh%i') as hora_formatada;

select time_format(curtime(), '%r') as hora_formatada;

#GATO

#%p retorna somente AM ou PM sem a hora
select time_format(curtime(), '%p') as hora_formatada;
select time_format(curtime(), '%H:%i:%s %p') as hora_formatada;

#Retorna a hora atual sempre no formato de 00....23,
#Independente da configuração do SO
select time_format(curtime(), '%T') as hora_formatada;

#Formatação para DATA
#Retorna o dia referente a data em formato numeral
select date_format(curdate(), '%d') as data_formatada;

#Retorna o dia referente a data em formato ordinal
select date_format(curdate(), '%D') as data_formatada;

#Retorna o dia partindo do 0 até 31
select date_format(curdate(), '%m') as data_formatada;
select date_format(curdate(), 'M') as data_formatada;

#Retorna o mes em numeral 1 a 12 
select date_format (curdate(), '%m') as data_formatada;

#Retorna o mes por extenso (completo)
select date_format(curdate(), '%M') as data_formatada;
#Retorna o mes por extenso (abreviado)
select date_format('2025-10-10', '%b') as data_formatada;

#Retorna o dia da semana
#em numeral referente aos dias (0- domingo, 1 - segunda, etc...)
select date_format(curdate(), '%w') as data_formatada;

#por extenso (completo)

#por extenso (abreviado)


