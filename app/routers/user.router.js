module.exports = function(router)
{
    var userController = require('../controllers/user.controller');
    router.get('/user/list',userController.get_list);
    //API signup
   router.post('/user/signup',userController.add_user);
   // API login
   router.post('/user/login',userController.login_user);
}