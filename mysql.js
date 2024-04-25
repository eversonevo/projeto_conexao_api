const { promise } = require('bcrypt/promises');
const mysql = require('mysql2');

// variaveis de ambiente
//"conecctionLimit": 1000, quantas conexões simultâneas são permitidas
// usando isso não precisa chamar get.connection  pode chamar o pool direto ou variavel de pool
// não precisa do pool.release();

/*var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
});*/

var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": "u903973099_bancoTeste",
    "password": "bancoTeste123",
    "database": "u903973099_bancoTeste",
    "host": "srv719.hstgr.io",
    "port": 3306,
});

exports.execute = (query, params=[])=>{
    return new Promise((resolve, reject)=>{
                pool.query(query, params, (error, result, fields)=>{
                    if (error) {
                        console.error('aaa'+error);
                        reject(error);                        
                    }else{
                        resolve(result);
                    }
                });
        })
   
}

exports.pool = pool;