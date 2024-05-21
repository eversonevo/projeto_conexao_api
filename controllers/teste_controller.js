
const mysql = require('../mysql');
const multer = require('multer'); //para trabalhar com imagens

// *********************************************************************************************

// CONSULTA DADOS - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.getDados = async (req, res, next) => {

    console.log('Aqui');


    try {

        const query = "SELECT * FROM teste;";
        const result = await mysql.execute(query);

        console.log('passando');
        
        const response = {
            nome: result.nome,
            telefone: result.telefone,
            dados: result.map(dado => {
                return {
                    id: dado.id,
                    nome: dado.nome,
                    telefone: dado.telefone,
                    
                    request: {
                        tipo: 'GET',
                        description: 'Retorna todos os dados',
                        url: process.env.URL_API + 'dados/' + dado.id
                    }
                }
            }),
        }

        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


// *********************************************************************************************

// INSERE PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.insereDados = async (req, res, next) => {
    try {
        const query = "INSERT INTO teste (nome, telefone) VALUES (?,?);";
        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.telefone            
        ]);

        const response = {
            mensagem: 'Dado inserido com sucesso!',
            dadoCriado: {
                id: result.insertId,
                nome: req.body.nome,
                telefone: req.body.telefone,
                request: {
                    tipo: 'POST',
                    description: 'Insere um dado',
                    url: process.env.URL_API + 'dados'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({error:error});
    }
}

// ALTERA PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.alteraDado = async (req, res, next) => {

    try {
        const query = "UPDATE teste SET nome = ?, telefone = ? WHERE id = ?";
        await mysql.execute(query,[
            req.body.nome, 
            req.body.telefone, 
            req.body.id,
        ]);
        const response = {
            mensagem: 'Produto alterado com sucesso!',
            dadoAtualizado: {
                id: req.body.id,
                nome: req.body.nome,
                telefone: req.body.telefone,
                request: {
                    tipo: 'GET',
                    description: 'Retorna detalhes de um produto',
                    url: process.env.URL_API + 'dados/' + req.body.id
                }
            }
        }

        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

// *********************************************************************************************

// REMOVE PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.removeDado = async (req, res, next) => {

    try {
        const query = "DELETE FROM teste WHERE id = ?;";
        const result = await mysql.execute(query,[req.body.id]);
        const response = {
            mensagem: 'Produto removido com sucesso!',
            request: {
                tipo: 'POST',
                description: 'Insere um produto',
                url: process.env.URL_API + 'dados/',
                body: {
                    nome: 'String',
                    telefone: 'String'
                }
            }
    
        }
    
        res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }

}


// *********************************************************************************************


// CONSULTA UM PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.getIdDado = async (req, res, next) => {
    
    try {
        console.log("oi");

        const query = "SELECT * FROM teste WHERE id = ?;";
        const result = await mysql.execute(query,[req.body.id]);
        console.log(result.length);
        if (result.length === 0) {
            return res.status(404).send({
                mensagem: "Não foi encontrado nenhum dado com este ID"
            });
        }
        const response = {
            dado: {
                id: result[0].id,
                nome: result[0].nome,
                telefone: result[0].telefone,
                //imagem_produto: process.env.URL_IMAGE_PROD+result[0].imagem_produto,
                request: {
                    tipo: 'GET',
                    description: 'Retorna um produto',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }

        return res.status(200).send(response);

        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

// *********************************************************************************************


// CONSULTA UM PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.getNomeDado = async (req, res, next) => {
    
    try {
        console.log("oi");

        const query = "SELECT * FROM teste WHERE nome = ?;";
        const result = await mysql.execute(query,[req.body.nome]);
        console.log(result.length);
        if (result.length === 0) {
            return res.status(404).send({
                mensagem: "Não foi encontrado nenhum dado com este ID"
            });
        }
        const response = {
            dado: {
                id: result[0].id,
                nome: result[0].nome,
                telefone: result[0].telefone,
                //imagem_produto: process.env.URL_IMAGE_PROD+result[0].imagem_produto,
                request: {
                    tipo: 'GET',
                    description: 'Retorna um produto',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }

        return res.status(200).send(response);

        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

// *********************************************************************************************

