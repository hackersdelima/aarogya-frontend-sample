const TOKEN_KEY = 'AAROGYATOKENKEY';
const BASE_URL = "http://103.187.8.15:8080";
//Resource APIs
const API_OAUTH_GET = `${BASE_URL}/oauth/token`;

$( "#loginForm" ).submit(function( event ) {
    event.preventDefault();
    let fd = {
        "username":$("#userName").val(),
        "password":$("#password").val()
    }

    sendAuthenticationRequest(
        API_OAUTH_GET,
        fd
    )
});

function sendAuthenticationRequest(url, authData) {
    $.ajax({
        url : url,
        type: "POST",
        crossDomain: true,
        contentType:'application/json',
        setRequestHeader:{
            'Access-Control-Allow-Origin':'*'
        },
        data : JSON.stringify(authData),
        success: function(data, textStatus, jqXHR)
        {
            if (data.status===0) {
                $("#message").html("Invalid username/password.");
            } else {
                window.localStorage.setItem(TOKEN_KEY,data.token);
                window.location = 'index.html';
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });
}