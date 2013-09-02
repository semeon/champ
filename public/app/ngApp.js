var appModule = angular.module('appModule', []);

// appModule.directive('driverFormTT', function() {
//     return {
//         restrict: 'E',
//         link: function(scope, elem, attrs) {
//             var chartData = scope.data;
//             var chartSettings = scope.chartSettings;

//             var canv = $('<canvas id="myChart" width="1000" height="500"></canvas>');
//             $(elem).append(canv);
//             var ctx = canv.get(0).getContext("2d");
//             var myNewChart = new Chart(ctx);

//             new Chart(ctx).Line(chartData, chartSettings);
//             elem.show();
//         }
//     };
// });



appModule.directive('angular', function() {

	console.log('@@@@@@@@@@@@@');

  return {
    restrict: 'ECMA',
    link: function(scope, element, attrs) {
      var img = document.createElement('img');
      img.src = 'http://goo.gl/ceZGf';
 
      // directives as comment
      if (element[0].nodeType === 8) {
        element.replaceWith(img);
      } else {
        element[0].appendChild(img);            
      }
    }
  };
});


appModule.directive('driverforms', function () {

	console.log('driverform drirective started');

  return {
    // priority: 0,
    templateUrl: '/app/views/_driverForm.html',
    // replace: false,
    // transclude: false,
    restrict: 'E',
    // scope: { a: 'AAAA'},
    // controller: driverFormCtrl,
    // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    // compile: function compile(tElement, tAttrs, transclude) {
     // return {
     //   pre: function preLink(scope, iElement, iAttrs, controller) { ... },
     //   post: function postLink(scope, iElement, iAttrs, controller) { ... }
     // }
     // or
     // return function postLink( ... ) { ... }
    // },
    // or
    // link: {
    //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
    //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
    // }
    // or
      // link: function(scope, elem, attrs) {
      //     // var chartData = scope.data;
      //     // var chartSettings = scope.chartSettings;

      //     console.log('Directive!!');

      //     var html = $('<h1>DIRECTIVE!!!!!!!!</h1>');
      //     $(elem).append(html);
      //     // var ctx = canv.get(0).getContext("2d");
      //     // var myNewChart = new Chart(ctx);

      //     // new Chart(ctx).Line(chartData, chartSettings);
      //     elem.show();
      // }
  };
});

// appModule.directive('driverform', function() {
//     return {
// 		    templateUrl: '/app/views/_driverForm.html',
//         restrict: 'E',
//         link: function(scope, elem, attrs) {
//         		console.log('SSSSS');
//             elem.show();
//         }
//     };
// });

// appModule.directive("driverform", function($compile) {
//     return {
//         restrict: "E",
//         scope: {root: '='},
//     		template: '<h1>DIRECTIVE</h1>',        
//         // templateUrl: 'app/views/_taskTree.html',
//         compile: function(tElement, tAttr) {
//             var contents = tElement.contents().remove();
//             var compiledContents;
//             return function(scope, iElement, iAttr) {
//                 if(!compiledContents) {
//                     compiledContents = $compile(contents);
//                 }
//                 compiledContents(scope, function(clone, scope) {
//                          iElement.append(clone); 
//                 });
//             };
//         }
//     };
// });
