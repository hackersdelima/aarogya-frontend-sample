//requires jquery.min.js & jquery.toast.min.js import
export class ToastNotification {
    constructor() {
    }

    getSuccessToastNotification(message) {
        $.toast({
            heading: 'Success',
            text: message,
            icon: 'success',
            hideAfter: 5000,
            position: 'bottom-center'
        });
    }

    getFailureToastNotification(message) {
        $.toast({
            heading: 'Failure',
            text: message,
            icon: 'error',
            hideAfter: 5000,
            position: 'bottom-center'
        });
    }


}