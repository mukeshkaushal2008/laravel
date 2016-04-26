coverApp.controller('HomeController', function ($scope, $state) {
    //$scope.view = $state.params.action;
    
    $scope.toggle = function () {
        $scope.$broadcast('event:toggle');
    }
    
    $scope.slickConfig = {
        enabled: true,
        adaptiveHeight: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        vertical: true,
        draggable: false,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    vertical: false
    }
            }
        ]
    }
    
    $scope.toggleSlick = function () {
        $scope.slickConfig.enabled = !$scope.slickConfig.enabled;
    }
    
});

coverApp.directive('toggle', function () {
    return function (scope, elem, attrs) {
        scope.$on('event:toggle', function () {
            elem.slideToggle();
        });
    };
});

coverApp.directive('slick', function ($timeout) {
    return function (scope, el, attrs) {
        $timeout((function () {
            el.slick({
                autoplay: true,
                arrows: true,
                prevArrow: '<button type="button" class="button-border button-circle button-small"><i class="icon-angle-left"></i></button>',
                nextArrow: '<button type="button" class="button-border button-circle button-small nextarrow"><i class="icon-angle-right"></i></button>',
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            })
        }), 100)
    }
});
