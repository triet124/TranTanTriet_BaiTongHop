var app = angular.module("myApp", [])
app.controller('myCtrl', function ($scope) {
    
})

app.filter('phoneValidate', function () {
    // Biểu thức chính quy để bắt số điện thoại đúng định dạng
    let regphone = /^(0[139785])\d{8}$/;
    return function (input) {
        // Kiểm tra nếu đầu vào khớp với biểu thức chính quy
        if (regphone.test(input)) {
            // Nếu hợp lệ, trả về đầu vào
            return input;
        } else {
            // Nếu không hợp lệ, trả về chuỗi rỗng
            return '';
        }
    };
})

app.filter('fullnameValidate', function () {
    // Biểu thức chính quy để bắt họ tên không được chứa số và các ký tự đặc biệt
    let regname = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯưẠ-ỹỲỳỴỵỶỷỸỹẮắẰằẲẳẴẵẶặẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰự\s]+$/;
    return function (input) {
        // Kiểm tra nếu đầu vào khớp với biểu thức chính quy
        if (regname.test(input)) {
            // Nếu hợp lệ, trả về đầu vào
            return input;
        } else {
            // Nếu không hợp lệ, trả về chuỗi rỗng
            return '';
        }
    }
})

app.filter('validatePassword', function () {
    // Biểu thức chính quy để bắt mật khẩu phải chứa ít nhất một ký tự thường, một ký tự số và một ký tự đặc biệt
    let regpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/;
    return function (input) {
        // Kiểm tra nếu đầu vào khớp với biểu thức chính quy
        if (regpass.test(input)) {
            // Nếu hợp lệ, trả về đầu vào
            return input;
        } else {
            // Nếu không hợp lệ, trả về chuỗi rỗng
            return '';
        }
    };
});

app.filter('validUsername', function () {
    let regusername = /^[a-zA-Z0-9_]+$/;
    // Biểu thức chính quy bắt username không được nhập ký tự có dấu và khoản trống
    return function (input) {
        // Kiểm tra nếu đầu vào khớp với biểu thức chính quy
        if (regusername.test(input)) {
            // Nếu hợp lệ, trả về đầu vào
            return input;
        } else {
            // Nếu không hợp lệ, trả về chuỗi rỗng
            return '';
        }
    };
})
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
            $scope.validDateOfBirth = function (date) {
                // Tạo một biến lấy ngày hiện tại
                var today = new Date();

                // Tạo biến birthDate và truyền date vào 
                var birthDate = new Date(date);

                // Tính toán tuổi dựa trên năm hiện tại và năm sinh
                var age = today.getFullYear() - birthDate.getFullYear();

                // Kiểm tra xem tháng của ngày hiện tại có nhỏ hơn tháng của ngày sinh không
                // Hoặc nếu cùng tháng nhưng ngày hiện tại nhỏ hơn ngày sinh
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    // Giảm tuổi đi 1 nếu chưa đến sinh nhật trong năm nay
                    age--;
                }
                // Kiểm tra nếu tuổi nằm trong khoảng từ 15 
                return age >= 15 ;
            }

            // Hàm AddUser được định nghĩa trong scope
            $scope.AddUser = function () {
                // Tạo đối tượng userdata từ các trường trong scope
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
                // Gửi yêu cầu POST đến action Create ở controller MVC với userdata là dữ liệu được gửi
                $http.post("/Home/Create", userdata, {
                    headers: {
                        // Đặt header Content-type là application/json
                        'Content-type': 'application/json'
                    }
                }).then(function (response) {
                    // Xử lý phản hồi thành công
                    if (response.data.success) {
                        // Nếu phản hồi có thuộc tính success là true thì sẽ chuyển đến trang List
                        $window.location.href = "/Home/List";
                    }
                    else {
                        // Nếu phản hồi có thuộc tính success là false, hiển thị thông báo lỗi
                        alert("Error: " + response.data.message)
                    }
                }).catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra khi gửi yêu cầu
                    console.error("Error", error)
                })
            }
        }
    }
});

