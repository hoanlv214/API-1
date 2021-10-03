var User=require('../models/user.model');

exports.get_list = function(rep,res) {
  User.get_all(function(data) {
   // res.send({result:data});
    res.send({result:data});
  });
}
// body-parser
// sigin
exports.add_user = function(rep,res){
    // chuyển data xuống thành mmodel để nó cho
    // vào database
    //req là nhận về dữ lữ từ giao diện form
  var data=rep.body;
  console.log(data);
  User.Create(data,function(response){
     res.send({result:response});
    });
}
// login user
exports.login_user= function(req,res) {
  console.log(req.body.sdt_user)
  User.checkPhoneNumber(req.body.sdt_user, (err, user)=>{
    if(err){
      res.send(JSON.stringify({
        Code: 1001,
        Message: 'Can not connect to DB'
    }));
    }else{
      if(user.length !== 0){
        res.send(JSON.stringify({
          Code: 1001,
          Message: 'tồn tại tài khoản'
        
      }));
      }else{
        res.send(JSON.stringify({
          Code: 1001,
          Message: 'Không tồn tại tài khoản'
         
      }));
      }

      // Lúc đăng nhập thì phải query cái PhoneNumber thôi 
    }
  })
}
