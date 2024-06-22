var app = angular.module("myApp", [])
app.controller('myCtrl', function ($scope) {

})
app.filter('phoneValidate', function () {
        return function (input) {
            // Kiểm tra số điện thoại Việt Nam
            if (/^(0[139785])\d{8}$/.test(input)) {
                // Định dạng số điện thoại có dấu chấm
                return input;
            } else {
                return '';
            }
        };
    })


//Tạo một directive có tên là stcModal
//app.directive('stcModal', function () {
//    return {
//        //Định nghĩa cho directive đó là một Element HTML
//        restrict: 'E',
//        //Nơi lưu trữ các biến của directive
//        scope: { 
//            // sử dụng "@" để liên kết giá trị chuỗi trực tiếp
//            title: '@', 
//            //content, myroot được gán với một biến bên trong controller
//            content: '=', 
//            myroot: '='
//        },
//        //Đường dẫn template dẫn tới html sẽ được hiển thị ở stcModal
//        templateUrl: './index.html',
//        link: function (scope, element, attrs) {
//        }
//    };
//});