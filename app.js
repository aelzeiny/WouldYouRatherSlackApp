const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {render_question, render_polly} = require('./views/wyr_render');
const {getQuestion, getGoodQuestion} = require('./wyr');

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};
String.prototype.removeQuotes = function(search, replacement) {
    return this.replaceAll('"', "'");
};

app.get('/wyr/', async (req, res) => {
    res.send(await getGoodQuestion());
});

app.post('/slack/wyr_custom/', async function(req, res) {
    const question = await getGoodQuestion();
    const formatted = render_question(question);
    res.send(JSON.stringify(formatted));
});

app.post('/slack/wyr/', async function(req, res) {
    const question = await getGoodQuestion();
    const formatted = render_polly(question);
    res.send(formatted);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));