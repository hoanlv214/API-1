var Post = require('../models/post.model');
var User = require('../models/user.model');

exports.get_list_posts = function (rep, res) {

  Post.get_list_posts(function (data) {
    if (data == null) {
      res.send(JSON.stringify({
        Code: 1001,
        Message: 'khong the kết nối với database'
      }));
    }
    else {
      res.send({ result: data });
    }
  });
}
/*
Người dùng nhập file đúng định dạng, nội dung không 
trống và dưới số lượng từ cực đại.
Kết quả mong đợi: Đăng bài thành công.*/
exports.add_post = function (rep, res) {
  var content = rep.body.content_post;
  var token = rep.body.token;
  if (content.length >= 200 || content.length == 0 || token.length == 0 || token == undefined || content == undefined) {
    res.send(JSON.stringify({
      Code: 100,
      Message: 'Invalid parameter- noi dung khong hop lệ'
    }));
  }
  else {
    User.checkToken(token, (err, user) => {
      if (err) {
        res.send(JSON.stringify({
          Code: 1001,
          Message: 'khong the kết nối với database'
        }));
      } else {
        if (user.length == 0) {
          res.send(JSON.stringify({
            Code: 1001,
            Message: 'token khong ton tai'
          }));
        }
        else {
          var url = 'new url'
          var DataNewPost = {
            id_user: user[0].id_user,
            content_post: content,
            //created_at: apiFunction.getDate(),
            url_post: url
          }
          Post.AddPost(DataNewPost, function (postb) {
            if (postb == null) {
              res.send(JSON.stringify({
                Code: 1001,
                Message: 'khong the kết nối với database'
              }));
            }
            else {
              res.send(JSON.stringify({
                Code: 1000,
                Message: 'đang bài thành công',
                data: postb.id_post,
              }));
            }
          });
        }
      }
    })
  }
}