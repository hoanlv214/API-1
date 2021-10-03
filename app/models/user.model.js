const db=require('../common/connect');

const User =function(user){
  this.id=user.id_user;
  this.name=user.name_user;
  this.pass=user.pass_user;
  this.sdt=user.sdt_user;
  this.linkavt=user.linkavt_user;
  this.listidblock=user.list_id_block;
}
//ham này trả về kết quả về biến result
User.get_all = function(result){
    
    db.query("SELECT * FROM user",function(err,user){
     //   console.log(user);
        if(err){
            result(null);
        }else{
            result(user);
        }
    });
}

User.Create = function(data,result){
   db.query("INSERT INTO user SET ?",data,function(err,user){
       if(err)
       {
           return(null);
       }
       else{
           result({id:user.insertId,...data});
       }
    });

}
User.checkPhoneNumber = (phoneNumber, result) =>{
    db.query('SELECT * FROM user WHERE sdt_user = ?',phoneNumber, (err, res) =>{
        if (err){
            console.log('Error check phone number', err);
            result(err,null);
        }else {
            console.log('Check phone number successfully');
            result(null, res);
        }
    })
}
module.exports=User;
