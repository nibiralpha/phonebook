const Router = require('koa-router');
const ContactController = require('../Controller/PhonebookController');


const router = new Router({
  prefix: '/contact'
});


router.get('/list', ContactController.list);
router.get('/detail/:phoneNo', ContactController.getByNumber);
router.post('/add', ContactController.create);
router.post('/update', ContactController.updateContact);
router.get('/delete/:phoneNo', ContactController.deleteContact);
router.get('/getByID/:id', ContactController.getByID);


module.exports = router;