﻿/*!
 * angular-fileinput v1.0.1
 *
 * Author: Never、C
 * Copyright: 2016, Never、C, neverc.cn
 *
 * https://github.com/NeverCL/Angular.FileInput
 */
(function (root, factory) {
    if (typeof root.define === 'function' && root.define.amd) {
        root.define(['angular', 'fileinput'], factory);
    } else factory();
}(window, function () {
    'use strict';
    angular.module('bs.fileinput', [])
        .constant('fileCfg', {
            uploadUrl: 'UploadFile.ashx',
            language: 'zh'
        })
        .directive('file', ['fileCfg', function (cfg) {
            return {
                require: '?ngModel',
                scope: {
                    allowFileExts: '=',
                    allowFileTypes: '='
                },
                restrict: 'C',
                link: fileLink
            };

            function fileLink(scope, ele, attr, ngModel) {
                if (!ngModel) return;

                var opt = cfg;

                if (scope.allowFileExts instanceof Array)
                    opt.allowedFileExtensions = scope.allowFileExts;

                if (scope.allowFileTypes instanceof Array)
                    opt.allowedFileTypes = scope.allowFileTypes;

                if (attr.multiple) {
                    opt.uploadAsync = false;
                    $(ele).fileinput(opt);
                    $(ele).on('filebatchuploadsuccess', function (evt, data) {
                        ngModel.$setViewValue(data.response);
                    });
                } else {
                    $(ele).fileinput(opt);
                    $(ele).on('fileuploaded', function (evt, data) {
                        ngModel.$setViewValue(data.response[0]);
                    });
                }
            }
        }]);
}));