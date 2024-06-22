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

app.filter('fullnameValidate', function () {
    let regname = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯưẠ-ỹỲỳỴỵỶỷỸỹẮắẰằẲẳẴẵẶặẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰự\s]+$/;
    return function (input) {
        if (regname.test(input)) {
            return input;
        } else {
            return '';
        }
    }
})

app.filter('validatePassword', function () {
    let regpass = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return function (input) {
        if (regpass.test(input)) {
            return input;
        } else {
            return '';
        }
    };
});
app.directive("passwordVerify", function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

//Tạo một directive có tên là stcForm
app.directive('stcForm', function () {
    return {
        //Định nghĩa cho directive đó là một Element HTML
        restrict: 'E',
        //Nơi lưu trữ các biến của directive
        scope: {
            name: "=",
            numberphone: "=",
            date: "=",
            gender: "=",
            city: "=",
            username: "=",
            password: "=",
            repassword: "="
        },
        //Đường dẫn template dẫn tới html sẽ được hiển thị ở stcForm
        templateUrl: './Usercontrol.html',
        controller: function ($scope, $http, $window) {
            $scope.AddUser = function () {
                var userdata = {
                    Name: $scope.Name,
                    numberPhone: $scope.numberPhone,
                    Date: $scope.Date,
                    Gender: $scope.Gender,
                    City: $scope.City,
                    Username: $scope.Username,
                    Password: $scope.Password,
                    rePassword: $scope.rePassword
                };
                $http.post("/Home/AddUser", userdata, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(function (response) {
                    if (response.data.success) {

                        $window.location.href = "/Home/List";
                    }
                    else {
                        alert("Error: " + response.data.message)
                    }
                }).catch(function (error) {
                    console.error("Error", error)
                })
            }
        }
    }
});

