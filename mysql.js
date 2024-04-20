const { promise } = require('bcrypt/promises');
const mysql = require('mysql2');

// variaveis de ambiente
//"conecctionLimit": 1000, quantas conexões simultâneas são permitidas
// usando isso não precisa chamar get.connection  pode chamar o pool direto ou variavel de pool
// não precisa do pool.release();

var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
});

exports.execute = (query, params=[])=>{
    return new Promise((resolve, reject)=>{
                pool.query(query, params, (error, result, fields)=>{
                    if (error) {
                        reject(error);                        
                    }else{
                        resolve(result);
                    }
                });
        })
   
}

exports.pool = pool;