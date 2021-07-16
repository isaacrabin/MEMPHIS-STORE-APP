const Mysqli  = require('mysqli');


let  conn  =  new  Mysqli ( { 
    host : 'localhost' ,  
    post : 3306 , 
    user : 'root' ,  
    passwd : 'mrongo20' ,     
    db : 'memphis_store'  
  } )

  let db = conn.emit(false, '');

  module.exports = {
    database:db
  };