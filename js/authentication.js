import * as Constants from "./constants.js";
import {CrudUtils} from "./crud.js";

export class Authentication {
    constructor() {
    }

    getHeaders() {
        let h = new Headers();
        h.append('Content-Type', 'application/json; charset=utf-8');
        h.append('Access-Control-Allow-Origin', '*');
        h.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        h.append('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization,Cache-Control');
        h.append('Access-Control-Max-Age', '3600');
        h.append('Access-Control-Allow-Credentials', 'true');
        return h;
    }

    getHeadersWithToken() {
        let token = this.getCurrentToken();
        let headers = this.getHeaders();
        headers.append('Authorization', `Bearer ${token}`);

        return headers;
    }

    getTokenHeader(){
        let h = new Headers();

        let token = this.getCurrentToken();
        h.append('Authorization', `Bearer ${token}`);

        return h;
    }

    getMultiPartHeaders() {
        let h = new Headers();
        h.append('Access-Control-Allow-Origin', '*');
        h.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        h.append('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization,Cache-Control');
        h.append('Access-Control-Max-Age', '3600');
        h.append('Access-Control-Allow-Credentials', 'true');
        return h;
    }
    getMultiPartHeadersWithToken() {
        let token = this.getCurrentToken();
        let headers = this.getMultiPartHeaders();
        headers.append('Authorization', `Bearer ${token}`);

        return headers;
    }

    sendAuthenticationRequest(url, authData) {
        let req = new Request(url, {
            method: 'POST',
            mode: 'cors',
            body: authData
        });
        fetch(req)
            .then(resp => resp.json())
            .then(data => {
                if (data.status===0) {
                    $("#message").html("Invalid username/password.");
                } else {
                    window.localStorage.setItem(Constants.TOKEN_KEY,data.token);
                    window.location = Constants.UI_DASHBOARD_PAGE;
                }
            })
            .catch(err => {
                console.error(err.message);
            });
    }

     changePasswordRequest(url, authData) {
         if (confirm('Are you sure?')) {
             let req = new Request(url, {
                 method: 'PUT',
                 mode: 'cors',
                 body: authData,
                 headers: new CAuthentication().getTokenHeader()
             });
             fetch(req)
                 .then(resp => {
                     if (resp.ok) return resp.json();
                 })
                 .then(data => {
                     const {message: msg, status} = data;
                     if (status === 200) {
                        new CToastNotification()
                             .getSuccessToastNotification("Successful");
                         setTimeout(() => {
                             this.sendLogoutReq().then(r => "System logout initiated.")
                         }, 2000);
                     } else if (status === 500) {
                        new CToastNotification()
                             .getSuccessToastNotification("Something went wrong");
                     } else {
                        new CToastNotification()
                             .getSuccessToastNotification(msg);
                     }
                     return data;
                 })
                 .catch(err => {
                     console.error(err.message);
                 });
         }
    }

    getCurrentToken(){
        let token = window.localStorage.getItem(Constants.TOKEN_KEY);
        if(null!=token && ''!==token) {
            return token;
        }
        return '';
    }

    sendLogoutReq = async () => {
        await CrudUtils.fetchResource(Constants.API_LOGOUT).then(r => console.log("Logout request completed."));
        window.localStorage.clear();
        window.location = Constants.BASE_URL;
    }
}