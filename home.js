import {get_all_questions_ids, search_questions_ids, get_question, push_comment} from './util.js'

$(document).ready(function() {
    $(window).load( function(){
        var forum = document.getElementById("forum");
        var quest_temp = document.getElementById("question_template");
        var comment_temp = document.getElementById("comment_template");
        const Url = new URL(window.location);
        if (Url.searchParams.has("search")) {
            const search_query = Url.searchParams.get("search");
            var ids = search_questions_ids(search_query).reverse();
            if (ids.length == 0) {
                $(".no_result").css({"display": "block"})
            }
        }
        else {
            var ids = get_all_questions_ids().reverse();
        }
        for (var i=0; i<ids.length; i++) {
            var question = get_question(ids[i]);
            var comments = question.comments;
            var clon = quest_temp.content.cloneNode(true);
            clon.children[0].id = ids[i];
            clon.getElementById("title").innerText = question.title;
            clon.getElementById("description").innerText = question.description;
            clon.getElementById("username").innerText = "By: " + question.user;
            var date = new Date(question.created_on).toDateString().split(" ");
            date = date[1] + " " + date[2] + ", " + date[3];
            clon.getElementById("datetime").innerText = date;
            for (var j=0; j<comments.length; j++) {
                var comment_clon = comment_temp.content.cloneNode(true);
                comment_clon.getElementById("comment").innerText = comments[j].name + ": " + comments[j].description;
                clon.getElementById("comments_section").append(comment_clon);
            }
            forum.append(clon);
            if (comments.length != 0) {
                console.log("g")
                $('#' + ids[i]).find("#comments_section").css({"display": "block"});
            }
            if (comments.length != 0) {
                $('#' + ids[i]).height($('#' + ids[i]).height() + (29*comments.length) + 32);
            }
            $('#' + ids[i]).find('#comment_submit_form').click(comment_submit);
        }
        document.getElementById("search").addEventListener("keydown", function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                var data = {"search": $("#search").val()}
                const queryString = new URLSearchParams(data).toString();
                window.location = "/?" + queryString;
            }
        });
    });
});
function comment_submit() {
    var comment_div = $(this).parent().parent();
    var name = comment_div.find("#comment_name_form").val();
    var description = comment_div.find("#comment_desc_form").val();
    if (description == "" || name == "") {
        return false
    }
    push_comment(comment_div[0].id, name, description);
    window.location.reload();
}