var User = require('../models/user.model');
var jwt = require('jsonwebtoken');


exports.get_list = function (rep, res) {
  User.get_all(function (data) {
    // res.send({result:data});
    res.send({ result: data });
  });
}

// body-parser
// sigin
/*
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
*/
// add user

exports.add_user = function (rep, res) {
  var phonenumber = rep.body.sdt_user;
  var password = rep.body.pass_user;
  if (phonenumber === null || password === null || phonenumber === '' || password === '' || phonenumber === undefined || password === undefined) {
    res.send(JSON.stringify({
      Code: 1002,
      Message: 'sai định dạng của số điện thoại hoặc mật khẩu'
    }))

  }
  else if (phonenumber.length !== 10 || phonenumber[0] !== '0') {
    console.log(phonenumber.length);

    res.send(JSON.stringify({
      Code: 1004,
      Message: 'Parameter value is invalid - Thông báo số điện thoại không đúng định dạng'
    }))
  } else {

    if (phonenumber === password || password.length > 10 || password.length < 6) {
      res.send(JSON.stringify({
        Code: 1004,
        Message: 'Parameter value is invalid - sai định dạng của mật khẩu'
      }))
    }
    else {
      var data = rep.body
      User.checkPhoneNumber(rep.body.sdt_user, (err, user) => {
        if (err) {
          res.send(JSON.stringify({
            Code: 1001,
            Message: 'khong the kết nối với database'
          }));
        } else {
          if (user.length !== 0) {
            res.send(JSON.stringify({
              Code: 9996,
              Message: 'tài khoản đã được đăng ký',
              // Data:user[0].id_user

            }));
          } else {
            // console.log(data);
            User.Create(data, function (response) {

              res.send(JSON.stringify({
                Code: 1000,
                Message: 'dang ky thanh cong',
                Data: response

              }))

            });

          }

        }
      })
    }
  }
}

// login user
exports.login_user = function (rep, res) {
  const data = rep.body;
  var phonenumber = rep.body.sdt_user;
  var password = rep.body.pass_user;
  if (phonenumber === null || password === null || phonenumber === '' || password === '') {
    res.send(JSON.stringify({
      Code: 1002,
      Message: 'sai định dạng của số điện thoại hoặc mật khẩu'
    }))

  }
  else if (phonenumber.length !== 10 || phonenumber[0] !== '0') {
    console.log(phonenumber.length);

    res.send(JSON.stringify({
      Code: 1004,
      Message: 'Parameter value is invalid - Thông báo số điện thoại không đúng định dạng'
    }))
  }
  else {
    if (phonenumber === password || password.length > 10 || password.length < 6) {
      res.send(JSON.stringify({
        Code: 1004,
        Message: 'Parameter value is invalid - sai định dạng của mật khẩu'
      }))
    }
    else {
      console.log(rep.body.sdt_user)
      User.checkPhoneNumber(rep.body.sdt_user, (err, user) => {

        if (err) {
          res.send(JSON.stringify({
            Code: 1001,
            Message: 'khong the kết nối với database'
          }));
        } else {
          if (user.length !== 0) {
            //console.log("khong lay duoc user pass"+user[0].id_user);
            const accessToken = jwt.sign({
              iss: user[0].pass_user,
              sub: user[0].sdt_user,
              iat: new Date().getTime(),
              exp: new Date().setDate(new Date().getTime() + 1)
            }, 'NodejsApiAuthentication')
            console.log(rep.body.sdt_user);
            User.createToken(rep.body.sdt_user, accessToken, (err, response) => {
              console.log("check token with phomenumber" + rep.body.sdt_user);
              if (err) {
                res.send(JSON.stringify({
                  code: '1001',
                  message: 'Can not connect to DB'
                }))
              } else {
                User.checkPhoneNumber(rep.body.sdt_user, (err, user) => {
                  res.send(JSON.stringify({
                    Code: 1000,
                    Message: 'ok đăng nhập thành công',
                    Data: user[0],
                    // Token: accessToken
                  }));
                })
              }
            })
          } else {
            res.send(JSON.stringify({
              Code: 9995,
              Message: ' Is Not Validated - số điện thoại chưa đăng ký'
            }));
          }
          // Lúc đăng nhập thì phải query cái PhoneNumber thôi 
        }
      })
    }
  }
}
//api.sign_out

/*
            User.updateToken(user.sdt_user, accessToken, (err, user) => {
              if (err) {
                res.send(JSON.stringify({
                  code: '1001',
                  message: 'Can not connect to DB'
                }))
              } else {

                res.send(JSON.stringify({
                  Code: 1000,
                  Message: 'ok đăng nhập thành công',
                  Data: user,
                  Token: accessToken

                }));

              }
            })
            */

