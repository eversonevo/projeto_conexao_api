const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//rotas
const rotaDados = require('./routes/dados');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Accept']
  }));

//controle de CORS, cabeçalhos  IMPORTANTÍSSIMO
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); // permissão de controle de acesso todos
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requerested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

// monitora as rotas em desenvolvimento
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyParser.json()); // só aceitará json

app.use('/dados',rotaDados);

// quando não encontra rota
app.use((req,res,next)=>{
    const erro = new Error('NÃO ENCONTRADO!');
    erro.status = 404;
    next(erro);
});

// achou erro vai para próxima função
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem:error.message
        }
    });
});

module.exports = app;