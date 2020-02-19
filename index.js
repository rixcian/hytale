const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const keys = require('./config/keys');


require('./models/Article');
require('./models/User');
const Article = mongoose.model('Article');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`🗄️  Server was successfully connected to MongoDB ... `))
  .catch(() => console.log(`❌ Server failed to connect to the database ...`));


app.use(express.static('public'));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {

  Article.find({ draft: false })
    .limit(1)
    .select('createdAt title thumbnailImagePath author uriName')
    .sort({ createdAt: -1 })
    .populate('author', '_id username avatarPath')
    .then(articles => res.render('index', { articles }))
    .catch(() => res.render('_errors/500'));

});


app.get('/clanek/:uriName', async (req, res) => {

  try {
     
    const article = await Article.findOne({ uriName: req.params.uriName })
    .select('createdAt title coverImagePath author content')
    .populate('author', '_id username avatarPath')
    .exec();

    const prevArticle = await Article.find({ createdAt: { $lt: article.createdAt } })
      .select('-_id title thumbnailImagePath uriName')
      .sort({ createdAt: -1 })
      .exec();

    const nextArticle = await Article.find({ createdAt: { $gt: article.createdAt } })
      .select('-_id title thumbnailImagePath uriName')
      .sort({ createdAt: 1 })
      .exec();

    console.log(prevArticle);
    console.log(nextArticle);

    res.render('article', { article, prevArticle: prevArticle[0], nextArticle: nextArticle[0] });

  } catch (err) {
    res.render('_errors/500');
  }  

});


app.get('/clanky/:skip/:limit', (req, res) => {

  const { skip, limit } = req.params;

  Article.find()
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort({ createdAt: -1 })
    .select('createdAt title thumbnailImagePath author uriName')
    .populate('author', '_id username avatarPath')
    .then(articles => res.send({ articles }))
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });

});


app.get('*', (req, res) => {

  res.render('_errors/404');

});


app.listen(PORT, () => {
  console.clear();
  console.log(`🚀  App is running on port ${PORT} ...`);
});