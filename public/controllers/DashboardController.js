coverApp.controller('DashboardController', function ($state, $scope, BASEURL, $http,$cookieStore) {
    if($cookieStore.get('user_data')){
        
    }
    else{
        $state.go('home');
    }
});
