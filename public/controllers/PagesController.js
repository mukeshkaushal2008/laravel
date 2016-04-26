coverApp.controller('PagesController', function ($state, $scope, BASEURL, $http, $cookieStore, $stateParams) {
    var action = $state.current.name;
    var user_data = $cookieStore.get('user_data');
    
    
    /*Function to contect us view 
     * Params - null
     */
    $scope.contactUs = function () {
       if(user_data != undefined && user_data['id'] && user_data['id'] !=''){
          $scope.user_id = user_data['id'];
          $scope.getSiteFeedback(user_data['id']);
       }else{
          $scope.user_id = '';
       }
    };
    
    
     $scope.getSiteFeedback = function () {
         $scope.loading = true;
         $http({
            method: 'POST',
            url: '/pages/getSiteFeedback',
            data: {'user_id' : user_data['id']},
         }).then(function successCallback(result, status) {
            $scope.loading = false;
            if (result.data.message == "success") {
                $scope.site_feedback = {'success': true,'result':result.data.response}
            } else {
                $scope.site_feedback = {'success': false,'result':result.data.response}
            }
        }, function errorCallback(result, status, headers, config) {
             $scope.loading = false;
            if (result.status == "400") {
                alert(result.status);
            } else if (result.status == "401") {
                alert(result.status);
            } else if (result.status == "402") {
                alert(result.status);
            } else if (result.status == "403") {
                alert(result.status);
            } else if (result.status == "404") {
                alert('404 (Not Found)');
            } else if (result.status == "500") {
                alert(result.status);
            }
        });
     };
    
    /*Function to contect us view 
     * Params - null
     */
    $scope.siteFeedback = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/pages/siteFeedback',
            data: {'user_id' : user_data['id'],comments: $scope.comments},
        }).then(function successCallback(result, status) {
            $scope.loading = false;
            if (result.data.message == "success") {
                $scope.site_error = {'success': true,'result':result.data.response}
                $scope.site_feedback_form.$setUntouched();
                $scope.comments = '';
                $scope.getSiteFeedback(user_data['id']);
            } else {
                $scope.site_error = {'success': false,'result':result.data.response}
            }
        }, function errorCallback(result, status, headers, config) {
             $scope.loading = false;
            if (result.status == "400") {
                alert(result.status);
            } else if (result.status == "401") {
                alert(result.status);
            } else if (result.status == "402") {
                alert(result.status);
            } else if (result.status == "403") {
                alert(result.status);
            } else if (result.status == "404") {
                alert('404 (Not Found)');
            } else if (result.status == "500") {
                alert(result.status);
            }
        });
    };
    
    /*Function to contect us view 
     * Params - null
     */
    $scope.contactUsEmail = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/pages/contactUsEmail',
            data: {user: $scope.user},
        }).then(function successCallback(result, status) {
            $scope.loading = false;
            if (result.data.message == "success") {
                $scope.contact_error = {'success': true,'result':result.data.response}
                $scope.email_form.$setUntouched();
                $scope.user = '';
            } else {
                $scope.contact_error = {'success': false,'result':result.data.response}
            }
        }, function errorCallback(result, status, headers, config) {
             $scope.loading = false;
            if (result.status == "400") {
                alert(result.status);
            } else if (result.status == "401") {
                alert(result.status);
            } else if (result.status == "402") {
                alert(result.status);
            } else if (result.status == "403") {
                alert(result.status);
            } else if (result.status == "404") {
                alert('404 (Not Found)');
            } else if (result.status == "500") {
                alert(result.status);
            }
        });
    };
    
    
    $scope.deleteComment = function(id){
        if(confirm("Are you sure want to delete feedback?")){
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/pages/deleteComment',
                data: {id: id},
            }).then(function successCallback(result, status) {
                $scope.loading = false;
                if (result.data.message == "success") {
                    $scope.site_error = {'success': true,'result':result.data.response}
                    $scope.getSiteFeedback(user_data['id']);
                } else {
                    $scope.site_error = {'success': false,'result':result.data.response}
                }
            }, function errorCallback(result, status, headers, config) {
                 $scope.loading = false;
                if (result.status == "400") {
                    alert(result.status);
                } else if (result.status == "401") {
                    alert(result.status);
                } else if (result.status == "402") {
                    alert(result.status);
                } else if (result.status == "403") {
                    alert(result.status);
                } else if (result.status == "404") {
                    alert('404 (Not Found)');
                } else if (result.status == "500") {
                    alert(result.status);
                }
            });
        }else{
            return false;
        }
    };
    
    switch (action) {
        case "contactus" :
            $scope.contactUs();
            break;
        default:
    }
});
