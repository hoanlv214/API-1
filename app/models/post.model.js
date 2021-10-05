const db = require('../common/connect');
const Post = function (post) {
    this.id_post = post.id_post;
    this.id_user = post.id_user;
    this.content_post = post.content_post;
    this.media = post.media;
    this.id_list_user_cm = post.id_list_user_cm ;
    this.id_list_user_like = post.id_list_user_like;
    this.date_create=post.date_create;
}
Post.get_list_posts = function (result) {
 db.query("SELECT * FROM tbl_post", function (err,post) {
        //   console.log(user);
        if (err) {
            result(null);
        } else {
            result(post);
        }
    });
}
Post.AddPost = function (data, result) {
    db.query("INSERT INTO tbl_post SET ?", data, function (err, post) {
        if (err) {
            console.log('Error create user', err);
            return (null);
        }
        else {
            console.log('Create user successfully');
            result({ id: post.insertId, ...data });
        }
    });

}
/*
User.createToken = (idsuer, token, result) => {
    db.query("UPDATE tbl_post SET token = ? WHERE idsuer = ?", [token, std],
        (err, res) => {
            if (err) {
                console.log('Error update token', err);
                result(err, null);
            } else {
                console.log('Update token successfully');
                result(null, res);
            }
        })
   }
*/
module.exports=Post;