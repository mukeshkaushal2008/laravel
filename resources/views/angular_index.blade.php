
<!DOCTYPE html>
<html lang="en" ng-app="coverApp">
    <head>
        <meta charset="UTF-8">        
        <meta name="author" content="COVER"/>
        <meta name="description" content="COVER"/>
        <title>COVER</title>
        <!--StyleSheet-->
        
         <link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css" />

         
        <script src="/assets/js/jquery.min.js"></script> 
        <script src="/scripts/modules/angular/angular.js"></script>
        <script src="/scripts/modules/angular-ui-router/release/angular-ui-router.min.js"></script>
        <script src="/scripts/modules/angular-messages/angular-messages.min.js"></script>
        <script src="/scripts/modules/angular-cookies/angular-cookies.min.js"></script>
        <script src="/scripts/app.js"></script>
        <!-- Angular Controllers & Directives -->
       
        
        <script type="text/javascript" src="/controllers/HomeController.js"></script>
        <script type="text/javascript" src="/controllers/UsersController.js"></script>
        <script type="text/javascript" src="/controllers/DashboardController.js"></script>
        <script type="text/javascript" src="/controllers/DatepickerController.js"></script>
        <script type="text/javascript" src="/services/CommonService.js"></script>
        <script type="text/javascript" src="/controllers/PagesController.js"></script>
         <!-- SCRIPTS -->
        <script type="text/javascript" src="/assets/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="/assets/js/ui-bootstrap-tpls-1.2.5.js"></script>
        <script type="text/javascript" src="/scripts/modules/datepicker/dist/multipleDatePicker.js"></script>
        <link rel="stylesheet" type="text/css" href="/scripts/modules/datepicker/dist/multiple-date-picker.css"/>
       
         <script type="text/javascript" src=" https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
    </head>
    <body class="body_bg" id="coverAppBody">
        <div ui-view> </div>
    </body>
</html>
