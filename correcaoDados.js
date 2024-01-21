const fs = require('fs')

function lerArquivo(nomeArquvivo){
    try{
        const dados = fs.readFileSync(nomeArquvivo, 'utf8')
        return JSON.parse(dados)
    }catch(error){
        console.error(`Erro ao ler o arquivo ${nomeArquvivo} : ${error.message}`)
        return null
    }
}


//função para corrigir os nomes dos veiculos emarca que estão corrompidos

function corrigirNomes(dados) {
    return dados.map(registro => {
        // vai trocar o 'æ' por 'a' e o 'ø' por 'o'
        if (registro.nome) {
            registro.nome = registro.nome.replace(/æ/g, 'a').replace(/ø/g, 'o')
        }
        if (registro.marca) {
            registro.marca = registro.marca.replace(/æ/g, 'a').replace(/ø/g, 'o')
        }

        return registro
    })
}

// função para corrigir os valores

function corrigirValoresdeVenda(dados) {
    return dados.map(registro => {
// vai ser mudado do valores que estão no formato de string para o formato numerico
        if (typeof registro.vendas === "string") {
            registro.vendas = parseFloat(registro.vendas.replace(',', '.')) // codigo para corrigir possiveis espaços indesejados
        }
        return registro
    })
}

function exportarArquivo(arquivoSaida, dados) {
    try {
       
        fs.writeFileSync(arquivoSaida, JSON.stringify(dados, null, 2))

        console.log(`os dados foram exportados com sucesso ${arquivoSaida}`)
    } catch (error) {
        console.log(`erro ao exportar o arquivo ${arquivoSaida}: ${error.message}`)
    }

}

function corrigirBancodeDados(nomeArquivoEntrada, nomeArquivoSaida){
    const dadosCorrompidos = lerArquivo(nomeArquivoEntrada)

    if(!dadosCorrompidos){
        return;
    }

    const corrigidoNomes = corrigirNomes(dadosCorrompidos)
    const dadosCorrigidosValores = corrigirValoresdeVenda(corrigidoNomes)

    exportarArquivo(nomeArquivoSaida, dadosCorrigidosValores)
}
const nomeArquivoEntrada1 = 'broken_database_1.json'
const nomeArquivoSaida1 = 'fixed_database_1.json'

corrigirBancodeDados(nomeArquivoEntrada1, nomeArquivoSaida1)

const nomeArquivoEntrada2 = 'broken_database_2.json'
const nomeArquivoSaida2 = 'fixed_database_2.json'

corrigirBancodeDados(nomeArquivoEntrada2, nomeArquivoSaida2)


//Este código lê o arquivo corrompido, realiza as correções necessárias nos nomes dos veículos e marcas, converte os valores de vendas para o tipo number, e exporta os dados corrigidos para um novo arquivo JSON.



