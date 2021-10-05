const db=require('../common/connect');

User.updatetoken = function(result){
    
    db.query("SELECT * FROM user",function(err,user){
     //   console.log(user);
        if(err){
            result(null);
        }else{
            result(user);
        }
    });

}
