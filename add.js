import {push_question} from './util.js'

$(document).ready(function() {
    var form = document.getElementById("form_submit");
    $('#question_form').submit(function() {
        var title = $("#form_title").val();
        var description = $("#form_description").val();
        var name = $("#form_name").val();
        $("#form_title").css({"border-width": "0px"});
        $("#form_title").css({"margin": "1.5%"});
        $("#form_description").css({"border-width": "0px"});
        $("#form_description").css({"margin": "0 1.5% 1% 1.5%"});
        $("#form_name").css({"border-width": "0px"});
        $("#form_name").css({"margin": "0 1.5%"});
        if (title == "") {
            $("#form_title").css({"border": "2px solid red"});
            $("#form_title").css({"margin": "calc(1.5% - 2px)"});
            return false
        }
        else if (description == "") {
            $("#form_description").css({"border": "2px solid red"});
            $("#form_description").css({"margin": "calc(0% - 2px) calc(1.5% - 2px) calc(1% - 2px) calc(1.5% - 2px)" });
            return false
        }
        else if (name == "") {
            $("#form_name").css({"border": "2px solid red"});
            $("#form_name").css({"margin": "calc(0% - 2px) calc(1.5% - 2px)"});
            return false
        }
        push_question(title, description, name);
        location.href = "/";
        return false
    });
});