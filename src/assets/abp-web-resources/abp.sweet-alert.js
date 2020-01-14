var abp = abp || {};
(function () {
    var showMessage = function (type, message, title, options) {

        if (!title) {
            title = message;
            message = undefined;
        }

        options = options || {};
        options.title = title;
        options.type = type;
        options.confirmButtonText = options.confirmButtonText || abp.localization.abpWeb('Ok');

        if (options.isHtml) {
            options.html = message;
        } else {
            options.text = message;
        }

        return Swal.fire(options);
    };

    abp.message.info = function (message, title, options) {
        return showMessage('info', message, title, options);
    };

    abp.message.success = function (message, title, options) {
        return showMessage('success', message, title, options);
    };

    abp.message.warn = function (message, title, options) {
        return showMessage('warning', message, title, options);
    };

    abp.message.error = function (message, title, options) {
        return showMessage('error', message, title, options);
    };

    abp.message.confirm = function (message, title, callback, options) {
        options = options || {};
        options.title = title ? title : abp.localization.abpWeb('AreYouSure');
        options.type = 'warning';

        options.confirmButtonText = options.confirmButtonText || abp.localization.abpWeb('Yes');
        options.cancelButtonText = options.cancelButtonText || abp.localization.abpWeb('Cancel');
        options.showCancelButton = true;

        if (options.isHtml) {
            options.html = message;
        } else {
            options.text = message;
        }

        return Swal.fire(options).then(function(result) {
            callback && callback(result.value);
        });
    };
})();
