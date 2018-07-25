function render_question(question) {
    const optionsTag = question.tags.map((tag) => {
        return {
            'text': tag,
            'value': tag
        }
    });
    return {
        "text": `${question.title}`,
        "attachments": [
            {
                "title": `:small_blue_diamond: ${question.choicea}\n:small_orange_diamond: ${question.choiceb}`,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "wyrOption",
                        "text": ":small_blue_diamond:",
                        "type": "button",
                        "style": "good",
                        "value": "choicea"
                    },
                    {
                        "name": "wyrOption",
                        "text": ":small_orange_diamond:",
                        "type": "button",
                        "style": "warning",
                        "value": "choiceb"
                    }
                ]
            },
            {
                "text": "Don't ask questions like these",
                "actions": [
                    {
                        "name": "remove",
                        "text": "Don't ask questions like these",
                        "style": "danger",
                        "type": "select",
                        "value": "remove",
                        "options": optionsTag,
                        "confirm": {
                            "title": "Banning a category?",
                            "text": "This will effect all users in your enterprise",
                            "ok_text": "Yes",
                            "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    };
}

function render_polly(question) {
    return `/poll "${question.title.removeQuotes()}" "${question.choicea.removeQuotes()}" "${question.choiceb.removeQuotes()}"`;
}

module.exports.render_question = render_question;
module.exports.render_polly = render_polly;