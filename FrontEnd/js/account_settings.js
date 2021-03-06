import { requestWithToken } from "./common.js";
import consts from "./consts.js";
import SessionManager from "./session.js";


$(document).ready(function () {
    loadUserInformation();
    $("#submit").click(function (e){
        e.preventDefault() 
        updateData()
    });
});

var nome, email, pass, gender, id, birthday, state_id, state_desc;
var n_nome, n_email, n_pass1, n_pass2;


const loadUserInformation = function(){
    requestWithToken("GET", '/api/users/User?id=' + SessionManager.get("session").shopping.id, function(data) {
        if (data) {
            $("#nome_bar").html(data.name);
            nome = data.name;
            $("#nome").val(data.name);
            $("#email").val(data.email);
            email = data.email;
            pass = data.password;
            gender = data.gender;
            id = data.id;
            state_id = data.state.id;
            state_desc = data.state.description;
            //$("#password").val(pass);
            //$("#confirm_password").val(pass);
            $("#dateTimePicker").val(data.birthday);
            $("#dateTimePicker").attr('readonly', 'readonly');
            

        } else {
            console.log("No store for this shopping");
        }

    }, function() {
        SweetAlert.fire(
            'Error!',
            'Error loading user`s information!',
            'error'
        )
    });
}

const updateData = function(){
    n_nome=$("#nome").val();
    n_email=$("#email").val();
    n_pass1=$("#password").val();
    n_pass2=$("#confirm_password").val();
    
    if (n_pass1!=n_pass2){
        SweetAlert.fire(
            'Error!',
            'Passwords doesn\'t match',
            'error'
        )
    }
    else{
        if (nome==n_nome && email == n_email && (n_pass1=="" && n_pass2=="")){
            SweetAlert.fire(
                'Error!',
                'User\'s information not updated',
                'error'
            )
        }
        else if(n_nome==="" || n_email===""){
            console.log(SessionManager.get("session").user)
            SweetAlert.fire(
                'Error!',
                'All fields must be filled',
                'error'
            )
        }
        else{
            var data = {"id":id,"password":n_pass1,"email":n_email,"name":n_nome,"gender":gender,"birthday":birthday,"state":{"id":state_id,"description":state_desc}}
            requestWithToken("PUT", '/api/users/updateUser', function(data) {
                var tp = SessionManager.get("session");
                tp.user.name = n_nome;
                SessionManager.set("session", tp);
                SweetAlert.fire(
                    'Updated!',
                    'Users information updated',
                    'success'
                )
                window.location.href = "./home.html";
            },
            
            function() {
                SweetAlert.fire(
                    'Error!',
                    'Users information not updated',
                    'error'
                )
            },
            data);        
        }
    }

}