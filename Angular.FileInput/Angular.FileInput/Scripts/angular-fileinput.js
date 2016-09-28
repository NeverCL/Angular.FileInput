(function (root, factory) {
    if (typeof root.define === 'function' && root.define.amd) {
        root.define(['angular', 'fileinput'], factory);
    } else factory();
}(window, function () {
    'use strict';
    angular.module('bs.fileinput', []).directive('file', function () {
        return {
            require: 'ngModel',
            restrict: 'C',
            link: fileLink
        };

        function fileLink(scope, ele, attr, ngModel) {
            if (attr.multiple) {
                $(ele).fileinput({ uploadUrl: 'UploadFile.ashx', language: 'zh', uploadAsync: false });
                $(ele).on('filebatchuploadsuccess', function (evt, data) {
                    var rst = data.response; ngModel.$setViewValue(rst);
                });
            } else {
                $(ele).fileinput({ uploadUrl: 'UploadFile.ashx', language: 'zh' });
                $(ele).on('fileuploaded', function (evt, data) {
                    var rst = data.response; ngModel.$setViewValue(rst[0]);
                });
            }
        }
    });
}));