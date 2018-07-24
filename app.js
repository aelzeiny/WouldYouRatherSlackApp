const express = require('express');
const app = express();
const {getQuestion, getGoodQuestion} = require('./wyr');

String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};
String.prototype.removeQuotes = function(search, replacement) {
    return this.replaceAll('"', "'");
};

app.get('/wyr/', async (req, res) => {
    res.send(await getGoodQuestion());
});


app.get('/slack/wyr/', async (req, res) => {
    const question = await getGoodQuestion();
    res.send(`/poll "${question.title.removeQuotes()}" "${question.choicea.removeQuotes()}" "${question.choiceb.removeQuotes()}"`);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));