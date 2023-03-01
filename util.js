export{get_all_questions_ids, search_questions_ids, get_question, push_question, push_comment};
import data from './data/questions.json' assert {type: 'json'};

function question(title, id, description, user, created_on, comments) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.user = user;
    this.created_on = created_on;
    this.comments = comments;
}
function get_all_questions_ids() {
    return Object.keys(data);
}
function search_questions_ids(query) {
    var all_keys = Object.keys(data);
    var keys = []
    for (var i=0; i<all_keys.length; i++) {
        var question = get_question(all_keys[i])
        if (question.title.includes(query) || question.description.includes(query) || question.user.includes(query)) {
            keys.push(all_keys[i])
        }
    }
    return keys;
}
function get_question(id) {
    var question_obj = data[id];
    return new question(question_obj["title"], id, question_obj["description"], question_obj["user"], question_obj["created_on"], question_obj["comments"]);
}
function push_question(title, description, user) {
    var num = ((Object.keys(data).length).toString().padStart(5, '0'));
    data[num] = ({
        "title": title,
        "description": description,
        "user": user,
        "created_on": Date.now(),
        "comments": []
    })
    fetch('/send_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"json": data,
               "push": data[num]
              })
    });
}
function push_comment(question_id, name, description) {
    data[question_id]["comments"].push({
        "name": name,
        "description": description
    })
    fetch('/send_comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"json": data,
                             "push": data[question_id]["comments"][data[question_id]["comments"].length-1],
                             "question": data[question_id]
                            })
    });
}