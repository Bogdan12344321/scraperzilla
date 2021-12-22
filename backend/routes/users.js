const router = require('express').Router();
let User = require('../models/user.model');
const auth = require("../middleware/auth");


router.get("/",auth,(req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username,password});

    newUser.save()
    .then(()=> res.json('User added !'))
    .catch(err => res.status(400).json('Error: '+err))
})

// Hash the plain text password before saving
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByCredentials(username, password);
      const token = await user.generateAuthToken();
      res.send(token);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.get("/me",auth, async (req, res) => {

    try {
      const user = await User.getLoggedUser(req);
      if (!user) {
        return res.status(404).send();
      }
      const {username} = user;
      res.send({username});
    } catch (e) {
      res.status(500).send();
    }
  });
  
  

module.exports = router;