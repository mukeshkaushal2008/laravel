coverApp.factory('CommonServices', function ($state, $http, $cookieStore) {
    return {
        loginPopup: function (data, callback) {
            var req = {method: 'POST', url: '/users/login', data: data};
            $http(req).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                callback(response);
            });
        },
        stepCompleted: function (type, steps) {
      
        if (type == 2) {
            switch (steps) {
                case "1":
                    return "employer_signup_step2";
                    break;

                case "2":
                    return "dashboard_employer";
                    break;
            }
        }
        if (type == 3) {
            switch (steps) {
                case "1":
                    return "doctor_signup_step2";
                    break;
                case "2":
                    return "doctor_signup_step3";
                    break;
                case "3":
                    return "doctor_step4";
                    break;
                case "4":
                    return "doctor_signup_step5";
                    break;
                case "5":
                    return "dashboard_doctor";
                    break;
            }
        }
    },
        isLoggedIn: function () {
            var user_data = $cookieStore.get('user_data');
            if (user_data != undefined && user_data['id'] && user_data['id'] != '') {
               return user_data;
            } else {
               $state.go('home');
    }
        }, requestAnotherReference: function (data,user_id, callback) {
            $http({
                method: 'POST',
                url: '/users/resendAnotherReference',
                data: {'data': data,'user_id':user_id},
            }).then(function successCallback(result) {
                callback(result.data);
            }, function errorCallback(result) {
                callback(result.data);
            });
        }
        
    };
});
