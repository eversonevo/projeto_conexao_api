// rotas do produto

const express = require('express');
const router = express.Router();
const teste_controller = require('../controllers/teste_controller');

//retorna todos os dados
router.get('/', teste_controller.getDados);

// insere um produto
router.post(
    '/',    
    teste_controller.insereDado);

//retorna os dados de um produto pelo id
router.get('/:id', teste_controller.getIdDado);

// altera um produto
router.patch(
    '/',
    //login.required, 
    teste_controller.alteraDado);

// deleta um produto
router.delete(
    '/',
    //login.required, 
    teste_controller.removeDado);

module.exports = router;