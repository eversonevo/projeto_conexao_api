// rotas do produto

const express = require('express');
const router = express.Router();
const teste_controller = require('../controllers/teste_controller');

//retorna todos os dados
router.get('/', teste_controller.getDados);

// insere um produto
router.post(
    '/',    
    teste_controller.insereDados);
/*
// retorna os dados de um produto pelo id
router.get('/:id_produto', produtos_controller.getIdProduto);

// altera um produto
router.patch(
    '/',
    login.required, 
    produtos_controller.updateProduto);

// deleta um produto
router.delete(
    '/',
    login.required, 
    produtos_controller.removeProduto);
*/
module.exports = router;