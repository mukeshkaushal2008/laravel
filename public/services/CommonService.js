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
        isLoggedIn :function (data, callback) {
          return ($cookieStore.get('user_data')) ? true : false 
        } 
         
    };
});
