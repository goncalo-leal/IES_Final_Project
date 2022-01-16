import SessionManager from "./session.js";


const updateView = function () {
    if (SessionManager.get("session") === null) {
        alert("Please log in!");
        window.location.href = "./no_loggin_shopp.html";
    }

    $("body").fadeIn(300);
}

export default updateView;