
import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    cnn:mysql.Connection;//ayuda a tener todas las propiedades y metodos
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host:'localhost',
            user:'node_user2',
            password: 'Williamgome2274477',
            database: 'node_db'
        });

        this.conectarDB();

      /*   this.cnn.connect(); */
    }

    public static get instance(){
        return this._instance || (this._instance = new this()); // de esta forma se previene que cundo llamemos muchas veces al getinstance siempre vamos a utlizar la misma instancia (patron singleton)
    }

    static ejecutarQuery(query : string , callback: Function ){

        this.instance.cnn.query(query, (err,results: Object[], fields )=>{

            if(err){
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if(results.length === 0 ){
                callback('El registro solicitado no existe');
            }else{
                callback(null ,results);
            }
        });

    }

    private conectarDB(){
        
        this.cnn.connect((err:mysql.MysqlError) => {

            if(err){
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('Base de datos online!');
        });
    }
}

