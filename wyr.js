

// const https = require('https');
const request = require('request');

const API_URL = "http://www.rrrather.com/botapi";
const FILTERED_TAGS = new Set(['rape', 'gross', 'sex']);
const VOTE_THRESHOLD = 200000;

function getQuestion() {
    const makeRequest = (resolve, reject) => {
        request(API_URL, {json: true}, (err, res, body) => {
            if (res.body.tags)
                res.body.tags = res.body.tags.split(',').map((el) => el.trim());
            if (res.body.choicea && res.body.choiceb) {
                res.body.choicea = capFirstWord(res.body.choicea);
                res.body.choiceb = capFirstWord(res.body.choiceb);
            }
            resolve(res.body);
        });
    };
    return new Promise(makeRequest);
}

function capFirstWord(word) {
    return word.charAt(0).toUpperCase() + word.substr(1)
}

const isGoodQuestion = (question) => {
    let voteCond = question.votes > VOTE_THRESHOLD;
    let bannedTagsCond = false;
    for(let i=0;i<question.tags.length;i++) {
        if (FILTERED_TAGS.has(question.tags[i])) {
            bannedTagsCond = true;
            break;
        }
    }
    return voteCond && !bannedTagsCond;
};

async function getGoodQuestion() {
    let question;
    do {
        question = await getQuestion();
    } while(!isGoodQuestion(question));
    return question;
}

function testTags(numQuestions=100) {
    let acceptedTags = new Set();
    for(let i=0;i<numQuestions;i++) {
        getGoodQuestion().then(q => {
            q.tags.forEach((el) => {
                // if (el == 'racism' || el == 'controversial')
                //     console.log(q);
                acceptedTags.add(el);
            })
        });
    }
    // setTimeout(() => console.log(acceptedTags), 10000);
}


module.exports.getQuestion = getQuestion;
module.exports.getGoodQuestion = getGoodQuestion;