module.exports = function(router)
{
    // Post
    var postController = require('../controllers/post.controller');
    //API get_list_posts
    router.get('/post/list',postController.get_list_posts);
    //API add_post
   router.post('/post/add_post',postController.add_post);
   // get_post 
   //git push -u
   // Post
}