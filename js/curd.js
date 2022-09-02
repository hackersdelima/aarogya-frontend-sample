import {Authentication} from "./authentication.js";
import {ToastNotification} from "./toastNotification.js";

export class CrudUtils {
  sendPostRequest(url, data) {
    this.sendRequest(url, data, 'POST');
  }

  sendPutRequest(url, data) {
    this.sendRequest(url, data, 'PUT');
  }

  sendPatchRequest(url, data) {
    this.sendRequest(url, data, 'PATCH');
  }

  sendDeleteRequest(url) {
    this.sendRequest(url, null, 'DELETE');
  }

  sendDeleteRequestWithPayload(url, data) {
    this.sendRequest(url, data, 'DELETE');
  }

  sendMultiPartPostRequest(url, data) {
    return this.sendMultiPartRequest(url, data, 'POST');
  }

  sendRequest(url, data, methodType) {
    let authentication = new Authentication();
    if (confirm('Are you sure?')) {
      CrudUtils.showLoader();
      let req = new Request(url, {
        method: methodType,
        mode: 'cors',
        headers: authentication.getHeadersWithToken(),
        body: data
      });
      fetch(req)
        .then(resp => resp.json())
        .then(responseData => {
          const {message: msg, status} = responseData;
          if (status === 200) {
            new ToastNotification()
              .getSuccessToastNotification(msg);
          } else if (status === 500) {
            new ToastNotification().getFailureToastNotification("Something went wrong.");
          } else {
            new ToastNotification().getFailureToastNotification(msg);
          }
          CrudUtils.hideLoader();
          return responseData;
        })
        .catch(err => {
          console.error(err.message);
          new ToastNotification().getFailureToastNotification(err.message);
          CrudUtils.showLoader();
        });
    }
  }

  static async fetchResource(url) {
    let req = new Request(url, {
      method: 'GET',
      mode: 'cors',
      headers: new Authentication().getHeadersWithToken()
    });

    return await fetch(req)
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(json => {
        return json;
      })
      .catch(err => {
        console.error(`Error: ${err.message}`);
      });
  }

  static async fetchResourceWithData(url, data) {
    let req = new Request(url, {
      method: 'GET',
      mode: 'cors',
      headers: new Authentication().getHeadersWithToken(),
      data: data,
      traditional: true
    });

    return await fetch(req)
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(json => {
        return json;
      })
      .catch(err => {
        console.error(`Error: ${err.message}`);
      });
  }

  static async fetchExternalResource(url) {
    let req = new Request(url, {
      method: 'GET',
      mode: 'cors'
    });

    return await fetch(req)
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(json => {
        return json;
      })
      .catch(err => {
        console.error(`Error: ${err.message}`);
      });
  }

  sendMultiPartRequest(url, data, methodType) {
    let authentication = new Authentication();
    if (confirm('Are you sure?')) {
      CrudUtils.showLoader();
      let req = new Request(url, {
        method: methodType,
        mode: 'cors',
        enctype: "multipart/form-data",
        headers: authentication.getMultiPartHeadersWithToken(),
        body: data,
        contentType: false
      });
      return fetch(req)
        .then(resp => {
          if (resp.ok) {
            CrudUtils.hideLoader();
            return resp.json();
          }
        })
        .then(json => {
          const {status, message} = json;
          if (status === 200) {
            new ToastNotification().getSuccessToastNotification(message);
          } else {
            new ToastNotification().getFailureToastNotification(message);
          }
          return json;
        })
        .catch(err => {
          console.error(`Error: ${err.message}`);
          new ToastNotification().getFailureToastNotification("File post failure.");
        });
    }
  }



  static showLoader() {
    $('#loadingModal').modal({backdrop: 'static', keyboard: false});
    $('#loadingModal').modal('show');
  }

  static hideLoader() {
    $('#loadingModal').modal('hide');
  }
}
