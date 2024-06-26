
const mysql = require('../mysql');
const multer = require('multer'); //para trabalhar com imagens
const { body, validationResult } = require('express-validator');
const db = require('../mysql'); // Importando a conexão do banco de dados


// Middleware de validação    SEPARAR
exports.validateId = [
    body('id').isInt({ gt: 0 }).withMessage('ID deve ser um número inteiro positivo')
  ];

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
exports.insereDado = async (req, res, next) => {
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
// Controlador para remover dado
exports.removeDado = async (req, res, next) => {
    console.log('entrei aqui');
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('entrei aqui 3');
      return res.status(400).json({ errors: errors.array() });
    }
  
    console.log('passei 3');

    // Extração do ID do corpo da requisição
  const { id } = req.body;
  const query = 'DELETE FROM teste WHERE id = ?';
  console.log(`Tentando excluir o registro com ID: ${id}`);

    try {
        const results = await db.execute(query, [id]);
        if (results.affectedRows === 0) {
          return res.status(404).send({ error: true, message: 'Registro não encontrado' });
        }
    
        return res.send({ error: false, message: 'Registro excluído com sucesso', data: results });
      } catch (err) {
        console.error('Erro ao excluir registro:', err);
        return res.status(500).send({ error: true, message: 'Erro ao excluir registro' });
      };
  

/*
    // Extração do ID do corpo da requisição
    const { id } = req.body;
    const query = 'DELETE FROM teste WHERE id = ?';
    console.log(`Tentando excluir o registro com ID: ${id}`);
  
    // Execução da consulta ao banco de dados
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erro ao excluir registro:', err);
        return res.status(500).send({ error: true, message: 'Erro ao excluir registro' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send({ error: true, message: 'Registro não encontrado' });
      }
  
      return res.send({ error: false, message: 'Registro excluído com sucesso', data: results });
    });*/
  };  

/*
    try {
        const query = "DELETE FROM teste WHERE id = ?;";
        const result = await mysql.execute(query,[req.params.id]);
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
*/



// *********************************************************************************************


// CONSULTA UM PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.getIdDado = async (req, res, next) => {
    
    try {
        console.log("oi");

        const query = "SELECT * FROM teste WHERE id = ?;";
        const result = await mysql.execute(query,[req.params.id]);
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
/*
const teste_controller = {
    validateId,
    getDados,
    insereDado,
    alteraDado,
    removeDado,
    getIdDado,
    getNomeDado,

};

exports.module = teste_controller;*/