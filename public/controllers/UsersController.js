coverApp.controller('UsersController', function ($state, $scope, BASEURL, $http, $cookieStore, $stateParams,$timeout,CommonServices) {
    //$scope.view = $state.params.action;
    
    var user_data = $cookieStore.get('user_data');
    
    var action = $state.current.name;
    $scope.open_hospital_form = 0;
    $scope.animationsEnabled = true;
    $scope.experience = [];
    
    $scope.uploadFile = function (type) {
        switch (type) {
            case "profile_pic" :
            var doc_type = $scope.profile_pic;
            break;
        }
         $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/uploadFile',
            data: {'file_type': type, 'file': doc_type, 'user_id': $stateParams.id}, }).then(function successCallback(result) {
             $scope.loading = false;
            if (result.data.response == "success") {
                    $scope.getUserDocuments(); 
            } else{
               alert(result.message);
                }
            }, function errorCallback(result) {
                $scope.loading = false;
                 //console.log(result.data)
            });
    }
    
    $scope.uploadDoc = function (files, type) {
        $scope.loading = true;
        var form_data = new FormData();
        
        form_data.append("file", files[0]);
        form_data.append("user_id", $stateParams.id);
        form_data.append("type", type);
       
        var uploadUrl = "/users/uploadDoc";
        
        $http.post(uploadUrl, form_data, {
            withCredentials: true,
            headers: {'Content-Type': undefined},
            crossDomain: false,
            transformRequest: angular.identity
        }).success(function (result) {
             $scope.loading = false;
            if (result.response == "success") {
               $scope.getUserDocuments(); 
            }else{
               alert(result.message);
            }
        }).error(function (result) {
            $scope.loading = false;
        });
    };
    
    
    
    $scope.employerDashboard = function () {
        $http({
            method: 'POST',
            url: '/users/employerDashboard',
            data: {},
        }).then(function successCallback(result) {
           // console.log(result.data);
            if (result.data.response == "success") {
                   
            } else {
            }
        }, function errorCallback(result) {
             //console.log(result.data)
        });
    }
    
    

    /*Function to create doctor signup
     * Params - user data
     * output - Returns create created 
     */
    $scope.createDoctor = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/createDoctor',
            data: {User: $scope.user},
        }).then(function successCallback(result, status) {
            if (result.data.response == "success") {
                $scope.doctor_success = result.data.message;
                $state.go('doctor_signup_step2', {id: result.data.message});
                $scope.loading = false;
            } else {
                $scope.doctor_error = result.data.message;
                $scope.loading = false;
            }
        }, function errorCallback(result, status, headers, config) {
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
    
    
      /*Function to get all active experiences
     * Params - null
     * output - Returns all active experiences in asc order
     */
    $scope.getAllExperiences = function () {
        $http({
            method: 'GET',
            url: '/users/getAllExperiences',
            data: {},
        }).then(function successCallback(result) {
            if (result.data.response == "success") {
                $scope.grades = result.data.message;
            } else {
                $scope.grades = result.data.message;
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };
    
     /*Function to get all active grades
     * Params - null
     * output - Returns all grades experiences in asc order
     */
    $scope.getAllGrades = function () {
        $http({
            method: 'GET',
            url: '/users/getAllGrades',
            data: {},
        }).then(function successCallback(result) {
            if (result.data.response == "success") {
                $scope.grades = result.data.message;
            } else {
                $scope.grades = result.data.message;
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };
    

    /* Function to get user_info of the user by his id
     * Params - id
     * output - Returns all info of the user
     */
    $scope.getUserInfoById = function (id) {
        $http({
            method: 'POST',
            url: '/users/getUserInfoById',
            data: {id: id},
        }).then(function successCallback(result) {
            if (result.data.status == 200) {
                $scope.user_data = result.data.response;
            } else {
                $scope.user_data = "";
            }
        }, function errorCallback(result) {
           // console.log(result.data)
        });
    };




    /*Function to load employer signup view
     * Params - null
     * output - Returns all active hospital list,signup view,department
     */
    $scope.doctorStep2 = function () {
        /* call user info method by id to get user first name */
        $scope.getUserInfoById($state.params.id);
        $scope.getAllGrades();
        $scope.gender = 'male';
        $scope.is_limited_company = 'yes';
        
         /*Function to create doctor signup step2
         * Params - user data
         * output - Returns create created for step2
         */
           
             $scope.loadExperiences = function ($query) {
                return $http.get('/users/getAllExperiences', {
                    cache: true
                }).then(function (response) {
                    var countries = response.data.message;
                    return countries.filter(function (country) {
                        return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
                    });
                });
          }; 
         // $scope.loadExperiences();
          }; 
      
     /*Function to get user documents
        * Params - user id
        * output - Returns the users uploaded documents
       */
    $scope.getUserDocuments = function () {
        $http({
            method: 'POST',
            url: '/users/getUserDocuments',
            data: {'userid': $stateParams.id},
        }).then(function successCallback(result, status) {
            if (result.data.response == "success") {
               $scope.user_documents = result.data.message;
            } else {
               $scope.user_documents = '';
            }
        }, function errorCallback(result, status, headers, config) {
            if (result.status == "400") {
              alert(result.status);
            }
            else if (result.status == "401") {
               alert(result.status);
            } else if (result.status == "402") {
               alert(result.status); 
            } else if (result.status == "403") {
               alert(result.status); 
            }
            else if (result.status == "404") {
               alert('404 (Not Found)'); 
            }
            else if (result.status == "500") {
               alert(result.status);
            }
        }); 
    };
    
    
    /*Function to get user references
     * Params - user id
     * output - Returns the users sent references
     */
    $scope.getUserReferences = function () {
        $http({
            method: 'POST',
            url: '/users/getUserReferences',
            data: {'user_id': $stateParams.id},
        }).then(function successCallback(result, status) {
            if (result.data.message == "success") {
                var data = result.data.response;
                $scope.user_references = data;
               
            } else {
               $scope.user_references = '';
            }
        }, function errorCallback(result, status, headers, config) {
            if (result.status == "400") {
              alert(result.status);
            }
            else if (result.status == "401") {
               alert(result.status);
            } else if (result.status == "402") {
               alert(result.status); 
            } else if (result.status == "403") {
               alert(result.status); 
            }
            else if (result.status == "404") {
               alert('404 (Not Found)'); 
            }
            else if (result.status == "500") {
               alert(result.status);
            }
        }); 
    };
    
    $scope.doctorStep3 = function () {
        $scope.getUserDocuments();
        $scope.getUserReferences();
    };
         
    
    /* function to show doctor signup step 4 page */
    $scope.doctorStep4 = function () {
        /* get experience filled in step 2 signup */
        $scope.getUserExperienceById();
        $scope.getUserInfoById($state.params.id);
        $scope.step4_data = {workHistory: [{position: '', company_name: '', from_month: '', from_year: '', to_month: '', to_year: '', reviews: ''}]};
        
        /* send months in view */
        $scope.monthslist = [
            {id: 1, name: "January"}, {id: 2, name: "February"}, {id: 3, name: "March"}, {id: 4, name: "April"}, {id: 5, name: "May"}, {id: 6, name: "June"}, {id: 7, name: "July"}, {id: 8, name: "August"}, {id: 9, name: "September"}, {id: 10, name: "October"}, {id: 11, name: "November"}, {id: 12, name: "December"}
        ];

        /* send years in view */
        var range = 100;
        var offset = 0;
        var currentYear = new Date().getFullYear();
        var years = [];
        for (var i = 0; i < range + 1; i++) {
            years.push(currentYear + offset - i);
        }
        $scope.yearlist = years;
        
        
        /* get total experience from database */
        //$scope.loadExperiences();
         $scope.loadExperiences = function ($query) {
                return $http.get('/users/getAllExperiences', {
                    cache: true
                }).then(function (response) {
                    var countries = response.data.message;
                    return countries.filter(function (country) {
                        return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
                    });
                });
            };

    };

    $scope.yearUpdated = function(){
        console.log($scope);
    };

    /* function to insert doctor signup step 4 form*/
    $scope.doctorSignupStep4 = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/doctorSignupStep4',
            data: {user_data: $scope.step4_data, user_id: $stateParams.id},
        }).then(function successCallback(result) {
            if (result.data.status == 200) {
                $state.go('doctor_signup_step5', {id: result.data.response});
                $scope.loading = false;
            } else {
                $scope.loading = false;
                $scope.step4_error = result.data.response;
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };



    $scope.doctorStep5 = function () {
         
    };
    
    $scope.skipDoctorRequestReference = function () {
         $scope.loading = true;
         var user_id = $stateParams.id;
         $state.go('doctor_step4', {id: user_id});
    };
    
    $scope.doctorRequestReference = function () {
        $scope.loading = true;
        var user_id = $stateParams.id;
        
        $http({
            method: 'POST',
            url: '/users/doctorRequestReference',
            data: {'user_id': user_id, 'data': $scope.user_references},
        }).then(function successCallback(result, status) {
            $scope.loading = false;
            if (result.data.message == "success") {
                $state.go('doctor_step4', {id: user_id});
            } else {
                $scope.doctor_error_step3 = result.data.response;
            }
        }, function errorCallback(result, status, headers, config) {
            if (result.status == "400") {
              alert(result.status);
            }
            else if (result.status == "401") {
               alert(result.status);
            } else if (result.status == "402") {
               alert(result.status); 
            } else if (result.status == "403") {
               alert(result.status); 
            }
            else if (result.status == "404") {
               alert('404 (Not Found)'); 
            }
            else if (result.status == "500") {
               alert(result.status);
            }
        });
    };
    
    $scope.doctorSignupStep2 = function () {
        $http({
            method: 'POST',
            url: '/users/doctorSignupStep2',
            data: {'is_limited_company': $scope.is_limited_company, 'gender': $scope.gender, 'userid': $stateParams.id, 'user': $scope.user, 'experience': $scope.experience},
        }).then(function successCallback(result, status) {
            if (result.data.response == "success") {
               
               $scope.doctor_success = result.data.message;
                $state.go('doctor_signup_step3', {id: result.data.message});
            } else {
                $scope.doctor_error_step2 = result.data.message;
            }
        }, function errorCallback(result, status, headers, config) {
            if (result.status == "400") {
              alert(result.status);
            }
            else if (result.status == "401") {
               alert(result.status);
            } else if (result.status == "402") {
               alert(result.status); 
            } else if (result.status == "403") {
               alert(result.status); 
            }
            else if (result.status == "404") {
               alert('404 (Not Found)'); 
            }
            else if (result.status == "500") {
               alert(result.status);
            }
        });
        
    };
    
    $scope.step_back = function () {
        $scope.loading = true;
        $state.go('doctor_signup_step3', {id: $stateParams.id});
    }
    

    /*Function to create employer signup
     * Params - user data
     * output - Returns create created 
     */
    $scope.createEmployer = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/createEmployer',
            data: {'User': $scope.user, 'Department': $scope.tags},
        }).then(function successCallback(result) {
           // console.log(result.data);
            if (result.data.response == "success") {
                $scope.loading = false;
                $scope.employer_success = result.data.message;
                $state.go('employer_signup_step2', {id: result.data.message});
            } else {
                $scope.employer_error = result.data.message;
                $scope.loading = false;
            }
        }, function errorCallback(result) {
             //console.log(result.data)
        });
    };

    /*Function to create employer signup step2
     * Params - user data
     * output - Returns create created 
     */
    $scope.createEmployerStep2 = function () {
        
        $http({
            method: 'POST',
            url: '/users/createEmployerStep2',
            data: {'User': $scope.user_data},
        }).then(function successCallback(result) {
           if (result.data.response == "success") {
                $scope.employer_success = result.data.message;
                $state.go('dashboard_employer', {employer_data: result.data.message});
            } else {
                $scope.employer_error = result.data.message;
            }
            
        }, function errorCallback(result) {
             //console.log(result.data)
        });
    };
    
    
    
    
    /*Function to load employer signup view
     * Params - null
     * output - Returns all active hospital list,signup view,department
     */
    $scope.doctorsignup = function () {
        $scope.getAllHospitals();
       // $scope.getAllDepartments();
    };


    /*Function to load employer signup view
     * Params - null
     * output - Returns all active hospital list,signup view,department
     */
    $scope.employerSignup = function () {
        $scope.getAllHospitals();
    };

    $scope.employerSignupStep2 = function () {
        var user_id = $stateParams.id;
        $http({
            method: 'GET',
            url: '/users/getEmployerProfile/' + user_id,
            data: {},
        }).then(function successCallback(result) {
            //console.log(result.data.message);
            /*console.log(result.data.departments);*/
            if (result.data.response == "success") {
                $scope.user_data = result.data.message;
                $scope.tags = result.data.departments;
            } else {
                $scope.user_data = '';
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };


   
    /*Function to get all active hospitals
     * Params - null
     * output - Returns all active hospital in asc order
     */
    $scope.getAllHospitals = function () {

        $http({
            method: 'GET',
            url: '/users/getAllHospitals',
            data: {},
        }).then(function successCallback(result) {

            if (result.data.response == "success") {
                $scope.hospitals = result.data.message;
            } else {
                $scope.hospitals = result.data.message;
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };

    /*Function to get all active departments
     * Params - null
     * output - Returns all active departments in asc order
     */
    $scope.getAllDepartments = function () {
        
        $http({
            method: 'GET',
            url: '/users/getAllDepartments',
            data: {},
        }).then(function successCallback(result) {

            if (result.data.response == "success") {
                $scope.department = result.data.message;
            } else {
                $scope.department = result.data.message;
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    }
    
   /*Function to get all active departments andn load it to view 
     * Params - null
     * output - Returns all active departments in asc order
     */
   $scope.tags = [];
    $scope.loadCountries = function ($query) {
      return $http.get('/users/getAllDepartments', {
       cache: true
        }).then(function (response) {
            var countries = response.data.message;
            return countries.filter(function (country) {
              //  console.log($query)
              return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
           });
         });
    };
    
    
    
    
    /*Function to show/hide hospital request
     * Params - null
     */
    $scope.openHospitalForm = function () {
        $scope.open_hospital_form = $scope.open_hospital_form == 1 ? 0 : 1;
         $scope.hospital_submitted = '';
    }
    
    /*Function to send  hospital request to admin
     * Params - null
     */
    $scope.hospitalRequest = function () {
        $scope.emptyArray = {};
        $scope.loading = true;
         $http({
            method: 'POST',
            url: '/users/hospitalRequest',
            data: {'data': $scope.hospital},
        }).then(function successCallback(result) {
            if (result.data.response == "success") {
                $scope.hospital_error = {'success': true, 'result': result.data.message};
                $scope.loading = false;
		$scope.hospital = angular.copy($scope.emptyArray);  
		$scope.open_hospital_form_data.$setUntouched();
            } else {
                $scope.loading = false;
                $scope.hospital_error = {'success': false, 'result': result.data.message};
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    }
    
    /*Function to load forgot password view
     * Params - null
     */
    $scope.forgotPassword = function () {

    };
    
    /*Function to send email with reset password link to user
     * Params - email
     */
    $scope.requestPassword = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/requestPassword',
            data: {'email': $scope.email},
        }).then(function successCallback(result) {
            //console.log(result);
            if (result.data.message == "success") {
                $scope.error = {'success': true, 'result': result.data.response};
                $scope.loading = false;
                $scope.email = '';
                $scope.forgot_password_form.$setUntouched();
            } else {
                $scope.error = {'success': false, 'result': result.data.response};
                $scope.loading = false;
            }
        }, function errorCallback(result) {
            $scope.loading = false;
            // console.log(result.data)
        });
    };
    
    /*Function to load forgot password view
     * Params - null
     */
    $scope.resetPassword = function () {
        var user_id = $stateParams.id;
        var token = $stateParams.token;
        
        $scope.emptyArray = {};
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/resetPassword',
            data: {'user_id': user_id, 'token': token},
        }).then(function successCallback(result) {
            //console.log(result);
            $scope.loading = false;
            if (result.data.message == "success") {
                
            } else {
                 $state.go('error_404', {});
            }
        }, function errorCallback(result) {
            $scope.loading = false;
            // console.log(result.data)
        });
    };
    
    /*Function to update password
     * Params - null
     */
    $scope.updatePassword = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/updatePassword',
            data: {'user_id': $stateParams.id, 'password': $scope.password, 'cpassword': $scope.cpassword},
        }).then(function successCallback(result) {
            //console.log(result);
            if (result.data.message == "success") {
                $scope.error = {'success': true, 'result': result.data.response};
                $scope.loading = false;
                
                $scope.password = '';
                $scope.cpassword = '';
                $scope.reset_password_form.$setUntouched();
            } else {
                $scope.error = {'success': false, 'result': result.data.response};
                $scope.loading = false;
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };


    /*Function to load references
     * Params - reference row id 
     */
    $scope.references = function (sort,type) {
        var id = $stateParams.id;
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/getReferencesData',
            data: {'id': id,'sort':sort,'type':type},
        }).then(function successCallback(result) {
            $scope.loading = false;
            //if feedback alreay given
            if(result.data.message == "redirect") {
                 $state.go('home', {});
            }
            else if(result.data.message == "success") {
                $scope.feedback = {'name' : result.data.response.reference_data.receiver_name,'position' : result.data.response.reference_data.receiver_role}
                $scope.data = {'success': true, 'result': result.data.response};
                if(result.data.response.questions !='' && result.data.response.question_answers[0]['type'] == 'radio'){
                   $scope.answer_id = '';
                }
                
                //check is last step of feedback then send to another page
            } else {
                $scope.data = {'success': false, 'result': result.data.response};
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    };
    
    $scope.nextReference = function (sort, question_id) {
        //Save the user feedback
        var reference_id = $stateParams.id;
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/saveFeedback',
            data: {'data': $scope.feedback, 'question_id': question_id, 'reference_id': reference_id},
        }).then(function successCallback(result) {
            $scope.loading = false;
            if (result.data.message == "success") {
                $scope.feedback_form.$setUntouched();
                $scope.feedback = {'comments': ''};
                if (result.data.is_last_step != '' && result.data.is_last_step == 'yes') {
                    
                    $scope.feedback_error = {'success': true, 'result': result.data.response};
                    $timeout(function () {
                       $state.go('home');
                    }, 3000);
    }
                else {
                    $scope.references(sort, 'next');
    }
            } else {
                $scope.feedback_error = {'success': false, 'result': result.data.response};
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    }
    
    
   /*
     *Function to be fired when back button clicked 
     *Here first we check that if a user has given answer to that question then we will delete that answer otherwise nothing will happen 
     * @param sort
     * @returns true/false
     */
    $scope.backReference = function(sort){
        
         //Save the user feedback
        var reference_id = $stateParams.id;
        //$scope.loading = true;
        
        $http({
            method: 'POST',
            url: '/users/saveFeedback',
            data: {'data' : $scope.feedback},
        }).then(function successCallback(result) {
            //$scope.loading = false;
            if (result.data.message == "success") {
                $scope.feedback_form.$setUntouched();
                $scope.feedback = {'comments': ''};
                 $scope.references(sort,'back');
                /*if(result.data.is_last_step != '' && result.data.is_last_step =='yes'){
                    $scope.feedback_error = {'success': true, 'result': result.data.response};
                    $timeout(function() {
                       $state.go('home');
                    }, 3000);
                }
                else{
                    $scope.references(sort,'back');
                }*/
            } else {
                $scope.feedback_error = {'success': false, 'result': result.data.response};
            }
        }, function errorCallback(result) {
            // console.log(result.data)
        });
    }

    $scope.updateDoctorExperiences = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/updateDoctorExperiences',
            data: {experience: $scope.experience, user_id: $stateParams.id},
        }).then(function successCallback(result) {
            if (result.data.status == 200) {
                $scope.loading = false;
            } else {
                $scope.loading = false;
            }
        }, function errorCallback(result) {
            //console.log(result.data)
        });
    };



    $scope.getUserExperienceById = function () {
        /* get user experience selected in step2 */
        $http({
            method: 'POST',
            url: '/users/getUserExperienceById',
            data: {id: $stateParams.id},
        }).then(function successCallback(result) {
            if (result.data.status == 200) {
                $scope.experience = result.data.response;
            } else {
                $scope.experience = result.data.response;
            }
        }, function errorCallback(result) {
            //console.log(result.data)
        });
    };


    $scope.LinkedINAuth = function () {
        IN.UI.Authorize().place();
        //IN.UI.Authorize().params({ "scope": ["r_fullprofile", "r_emailaddress", "r_basicprofile", "r_network", "rw_nus"] }).place();
    }

    $scope.onLinkedInLoad = function ($type) {
        $scope.LinkedINAuth();
        IN.Event.on(IN, "auth", function () {
            if ($type == "positions") {
                $scope.getLinkedInDataPositions();
            } else {
                $scope.getLinkedInDataEducations();
            }

        });

        IN.Event.on(IN, "logout", function () {
            onLinkedInLogout();
        });
    }

    $scope.getLinkedInDataPositions = function () {
        if (!$scope.hasOwnProperty("userprofile")) {
            $("#linkedinbtn_positions").hide();
            $(".linkedinlogoutbtn").removeClass("hide");
           IN.API.Profile("me").fields("positions")
          //IN.API.Raw("/people/~:(id,educations,languages,positions)")
            .result(function (response) {
                $scope.$apply(function () {
                    var positions_data = response.values[0].positions.values;
                    var user_work_history = [];
                    for (i = 0; i < response.values[0].positions._total; i++) {
                        var isCurrent = positions_data[i].isCurrent;
                        if (isCurrent == true) {
                            var d = new Date();
                            var year = d.getFullYear();
                            var month = d.getMonth();
                        }
                        var single_work_history = {position: positions_data[i].title, company_name: positions_data[i].company.name, from_month: positions_data[i].startDate.month.toString(), from_year: positions_data[i].startDate.year.toString(), to_month: month.toString(), to_year: year.toString(), reviews: positions_data[i].summary};
                        user_work_history.push(single_work_history);
                    }
                    if (user_work_history.length > 0) {
                        $scope.step4_data.workHistory = user_work_history;
                    }
                });
            })
            .error(function (err) {
                $scope.$apply(function () {
                    $scope.error = err;
                });
            });
        }
    };


    $scope.getLinkedInDataEducations = function () {
        if (!$scope.hasOwnProperty("userprofile")) {
            //$(".linkedinbtn").hide();
            //$(".linkedinlogoutbtn").removeClass("hide");
             IN.API.Profile("me").fields("educations").result(function (response) { 
                console.log(response);
                $scope.$apply(function () {
                    
                });
            })
            .error(function (err) {
                $scope.$apply(function () {
                    $scope.error = err;
                });
            });
        }
    };



    //logout and go to login screen
    $scope.logoutLinkedIn = function () {
        location.reload(true);
    };

    $scope.removeWorkhistory = function () {
        if ($scope.step4_data.workHistory.length > 1) {
            var lastItem = $scope.step4_data.workHistory.length - 1;
            $scope.step4_data.workHistory.splice(lastItem);
        }
    };

    $scope.cloneWorkhistory = function () {
        var newItemNo = $scope.step4_data.workHistory.length + 1;
        $scope.step4_data.workHistory.push({position: '', company_name: '', from_month: '', from_year: '', to_month: '', to_year: '', reviews: ''});
    };


     /*Function to  get data 
     * Params - reference type,user_id
     * 1)Reference
     * 2)Employer
     * 3)Doctor 
     */
    $scope.getAllfeedbacks = function (user_id,feedback_type) {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/users/getAllfeedbacks',
            data: {user_id: user_id,'feedback_type':feedback_type},
        }).then(function successCallback(result) {
            $scope.loading = false; 
            if (result.data.status == 200) {
                $scope.feedback_error = {'success': true, 'result': result.data.response,'percentage' : result.data.percentage};
            } else {
                $scope.feedback_error = {'success': false, 'result': result.data.response,'percentage' : result.data.percentage}
            }
        }, function errorCallback(result) {
            $scope.loading = false;
        });
    };
    
    
    /*Function to load feedbacks view and call function to get data 
     * Params - reference type
     * 1)Reference
     * 2)Employer
     * 3)Doctor 
     */
    $scope.feedbacks = function (feedback_type) {
       var userdata = CommonServices.isLoggedIn();
       if(userdata['id'] !=''){
           $scope.getAllfeedbacks(userdata['id'],feedback_type);
       }
    };
    
    
    switch (action) {
        case "employer_signup" :
            $scope.employerSignup();
            break;
        case "employer_signup_step2" :
            $scope.employerSignupStep2();
            break;
        case "dashboard" :
            $scope.employerDashboard();
        break;
        case "doctor_signup" :
            $scope.doctorsignup();
            break;
        case "doctor_signup_step2" :
            $scope.doctorStep2();
            break;
        case "doctor_signup_step3" :
            $scope.doctorStep3();
            break;
        case "doctor_step4" :
            $scope.doctorStep4();
            break;
        case "doctor_signup_step5" :
            $scope.doctorStep5();
            break;
        case "forgot_password" :
            $scope.forgotPassword();
            break;
        case "reset_password" :
            $scope.resetPassword();
            break;
        case "references" :
            $scope.references();
            break;
        case "feedbacks" :
            $scope.feedbacks();
            break;
        default:
    }
});

