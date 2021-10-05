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
/*
User.getByPhoneNumber =function(phoneNumber,result)
{ 
    console.log(phoneNumber);
    db.query("SELECT * FROM user WHERE sdt_user = ?",phoneNumber,function(err,user)
    { 
       if(err||user.length==0)
       { 
           result(null);
       }
       else{

       }
    });

}
*/

// khai bao funsion
User.Create = function(data,result){
   db.query("INSERT INTO user SET ?",data,function(err,user){
       if(err)
       {
           console.log('Error create user', err);
           return(null);
       }
       else{
        console.log('Create user successfully');
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


User.updateToken = (std, token, result) =>{
    db.query(`UPDATE user SET token = '${token}' WHERE 	sdt_user = '${std}'`,(err, res) =>{
        if (err){
            console.log('Error update token', err);
            result(err,null);
        }else {
            console.log('Update token successfully');
            result(null, res);
        }
    })
}

User.createToken = (std, token, result) =>{
    
    db.query("UPDATE user SET token = ? WHERE sdt_user = ?",[token,std],
        (err, res) => {
            if(err)
            { 
                console.log('Error update token', err);
                result(err,null);

            }else {
                console.log('Update token successfully');
                result(null, res);
            }

        })

}


module.exports=User;
