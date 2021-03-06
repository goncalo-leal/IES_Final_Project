import consts from "./consts.js";
import SessionManager from "./session.js";
import {updateView, requestWithToken} from "./common.js";

var shoppingCapacity;
var complete_data;

$(document).ready(function() {
    updateView();

    $('#opening_timepicker').datetimepicker({
        format: 'HH:mm',
        use24hours: true,
    });
    
    $('#closing_timepicker').datetimepicker({
        format: 'HH:mm',
        use24hours: true,
    });

    $("#capacity").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
    
    $("#add_park").click(function(){
        var data_complete = {"location":$("#location").val(), "name":$("#park_name").val(),
            "capacity":$("#capacity").val(), "opening":$("#opening").val(), "closing":$("#closing").val()};
        
        if ($("#location").val()!="" && $("#park_name").val()!="" && $("#capacity").val()!="" && $("#opening").val()!="" && $("#closing").val()!="")
            
            requestWithToken(
                "POST", 
                "/api/parks/addPark/" + SessionManager.get("session").shopping.id, 
                function(){
                    SweetAlert.fire(
                        'Park Added!',
                        'You added a new park to the shopping!',
                        'success'
                    ).then(function() {
                        window.location.href = "./park_management.html"
                    })
                },
                function(){
                    SweetAlert.fire(
                        'Error!',
                        'Error while adding a new park to the shopping!',
                        'error'
                    )
                },
                data_complete   
                );

    })
});
