const router = require('express').Router();
const auth = require("../middleware/auth");
const { scraper } = require('../scraper.js');
let Scarpings = require('../models/scrapings.model');

router.get('/:instagramName/followers', auth, async (request, res) => {
  const instagramName = request.params.instagramName

  scraper(instagramName).then((response) => {
    const { inner_html_posts, inner_html_followers, inner_html_following } = response;
    const newScraping = new Scarpings({ userInsta: instagramName, followers: inner_html_followers, following: inner_html_following, posts: inner_html_posts });

    newScraping.save()
      .then(() => res.json(newScraping))
      .catch(err => res.status(400).json('Error: ' + err))
  })
});

router.get("/", auth, (req, res) => {
  Scarpings.find()
    .then(scarpings => res.json(scarpings))
    .catch(err => res.status(400).json('Error:' + err))
});

router.get('/:username/search', auth, async (request, res) => {
  const username = request.params.username
  if (username.length < 1) {
    Scarpings.find()
      .then(scarpings => res.json(scarpings))
      .catch(err => res.status(400).json('Error:' + err))
  } else {
    Scarpings.find(
      { "userInsta": { "$regex": username, "$options": "i" } },
    ).then(scarpings => res.json(scarpings))
      .catch(err => res.status(400).json('Error:' + err))
  }
});


module.exports = router;