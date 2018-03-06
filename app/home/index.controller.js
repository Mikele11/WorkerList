
(function () {
    'use strict';
		var myApp = angular.module('app', []);
		myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
			console.log("I am in controller");
			$scope.filteredTodos = []
		   ,$scope.currentPage = 1
		   ,$scope.numPerPage = 4
		   ,$scope.maxSize = 5;

		   
		var refresh = function() {
		  $http.get('/workers').success(function(response) {
			console.log("Geter");
			$scope.workers = response;
			$scope.len=$scope.workers.length;
			$scope.page=Math.ceil($scope.len/$scope.numPerPage);
			$scope.contact = "";
		  });
		};
		refresh();
		//панинация
		  $scope.numPages = function () {
			$http.get('/workers').success(function(response) {
			$scope.workers = response;
			$scope.numPages= Math.ceil($scope.workers.length / $scope.numPerPage);
		   });  
		  };
		var pagin = function() {
		  $scope.$watch('currentPage + numPerPage', function() {
			$http.get('/workers').success(function(response) {
			var begin = (($scope.currentPage - 1) * $scope.numPerPage);
			var end = begin + $scope.numPerPage; 
			$scope.filteredTodos = $scope.workers.slice(begin, end);
			}); 
		  });
		};
		pagin();
		//конец пагинации
		$scope.addContact = function() {
			if (($('.form-control.fname').val()=='')||($('.form-control.lname').val()=='')||($('.form-control.position').val()=='')){
				alert('Enter value');
			}else{
			  console.log($scope.contact);
			  $http.post('/workers', $scope.contact).success(function(response) {
				console.log(response);
				pagin();			  
				refresh();
			  });
			}
		};
		
		$scope.getAll = function() {
			refresh();
			pagin();			  
		};
				
		$scope.remove = function(id) {
		  console.log(id);
		  $http.delete('/workers/' + id).success(function(response) {
			pagin();
			refresh();
		  });
		};
		$scope.deleteSelected = function(id) {
		  $http.get('/workers').success(function(response) {
			$scope.workers = response;
			$( ".class1" ).each(function( index ) {
				if ($(this).prop('checked')==true){
					var myID=$scope.workers[index]._id;
					$http.delete('/workers/' + myID).success(function(response) {
						pagin();
						refresh();
					});
				};
			});
		  });
		};

		$scope.edit = function(id) {
		  console.log(id);
		  $http.get('/workers/' + id).success(function(response) {
			$scope.contact = response;
		  });
		};  		
		$scope.update = function() {
		  console.log($scope.contact._id);
		  $http.put('/workers/' + $scope.contact._id, $scope.contact).success(function(response) {
			pagin(); 
			refresh();
		  })
		};

		$scope.deselect = function() {
		  $scope.contact = "";
		}

		//----------------------------------------------		
		jQuery(document).ready(function($) {
			$('.table>div:nth-of-type(1)>div:nth-of-type(1)').click(function(){
				var fname = $('.form-control:nth-of-type(1)').val();
							
				function buildUrl(url, parameters){
				  var qs = "";
				  for(var key in parameters) {
					var value = parameters[key];
					qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
				  }
				  if (qs.length > 0){
					qs = qs.substring(0, qs.length-1);
					url = url + "?" + qs;
				  }
				  return url;
				}
				
				var url = "/fname/";
				var parameters = {
				  fname: fname
				};
				console.log(buildUrl(url, parameters));
				var urlsend = buildUrl(url, parameters);
				$.ajax({
				  url: urlsend,
				  type: "GET",
				  data: {"fname":fname},
				  cache: false,
				  success: function(response){
					console.log('My filter'); 
					$scope.filteredTodos=response;
					console.log($scope.filteredTodos);
					console.log('end of me filter');
					$('#firstN').trigger('click');
				   }
				});				
			});
			//--------------------------------- end fname
			$('.table>div:nth-of-type(1)>div:nth-of-type(2)').click(function(){
				var lname = $('.form-control.lname').val();
				console.log(lname);		
				function buildUrl(url, parameters){
				  var qs = "";
				  for(var key in parameters) {
					var value = parameters[key];
					qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
				  }
				  if (qs.length > 0){
					qs = qs.substring(0, qs.length-1);
					url = url + "?" + qs;
				  }
				  return url;
				}
				
				var url = "/lname/";
				var parameters = {
				  lname: lname
				};
				console.log(buildUrl(url, parameters));
				var urlsend = buildUrl(url, parameters);
				$.ajax({
				  url: urlsend,
				  type: "GET",
				  data: {"lname":lname},
				  cache: false,
				  success: function(response){
					console.log('My filter'); 
					$scope.filteredTodos=response;
					console.log($scope.filteredTodos);
					console.log('end of me filter');
					$('#lastN').trigger('click');
				   }
				});				
			});
			//------------------------------------end lname
			$('.table>div:nth-of-type(1)>div:nth-of-type(3)').click(function(){
				var position = $('.form-control.position').val();
							
				function buildUrl(url, parameters){
				  var qs = "";
				  for(var key in parameters) {
					var value = parameters[key];
					qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
				  }
				  if (qs.length > 0){
					qs = qs.substring(0, qs.length-1);
					url = url + "?" + qs;
				  }
				  return url;
				}
				
				var url = "/position/";
				var parameters = {
				  position: position
				};
				console.log(buildUrl(url, parameters));
				var urlsend = buildUrl(url, parameters);
				$.ajax({
				  url: urlsend,
				  type: "GET",
				  data: {"position":position},
				  cache: false,
				  success: function(response){
					console.log('My filter'); 
					$scope.filteredTodos=response;
					console.log($scope.filteredTodos);
					console.log('end of me filter');
					$('#positionN').trigger('click');
				   }
				});				
			});			
			
		});//ready
		//----------------------------------------------
		
	}]);﻿
})();