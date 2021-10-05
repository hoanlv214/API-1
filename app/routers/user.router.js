module.exports = function(router)
{
    // User
    var userController = require('../controllers/user.controller');
    //API get all user
    router.get('/user/list',userController.get_list);
    //API signup
   router.post('/user/signup',userController.add_user);
   // API login
   router.post('/user/login',userController.login_user);
   //API logout.
   router.post('/user/logout',userController.logout_user);
   //https://www.youtube.com/watch?v=mqpNSBiuIVw
   // hoc về sinh token
   //git push -u
   // Post
}