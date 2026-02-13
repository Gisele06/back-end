/***************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de cálculos de média e definição de status do aluno
 * Autor: Gisele
 * Data: 11/02/26
 * Versão: 1.1 (Corrigida)
 ***************************************************************************************************/

function calcularMedia(nota1, nota2, nota3, nota4) {

    const notas = [nota1, nota2, nota3, nota4]

    // Validação
    if (notas.some(nota => nota === "" || isNaN(nota) || nota < 0 || nota > 100)) {
        return false
    }

    let media = ( Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 4
    return media
}

function definirStatus(media) {

    if (media === false) {
        return false
    }

    let statusAluno

    if (media >= 70) {
        statusAluno = "APROVADO(A) !!!"
    } else if (media >= 50) {
        statusAluno = "RECUPERAÇÃO !!!"
    } else {
        statusAluno = "REPROVADO(A) !!!"
    }

    return statusAluno
}

module.exports = {
    calcularMedia,
    definirStatus
}
