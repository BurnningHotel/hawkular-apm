/// Copyright 2014-2015 Red Hat, Inc. and/or its affiliates
/// and other contributors as indicated by the @author tags.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///   http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.

/// <reference path="btmPlugin.ts"/>
module BTM {

  export var BTMCandidatesController = _module.controller("BTM.BTMCandidatesController", ["$scope", "$http", '$location', '$uibModal', ($scope, $http, $location, $uibModal) => {

    $scope.newBTxnName = '';
    $scope.selecteduris = [ ];
    $scope.candidateCount = 0;

    $http.get('/hawkular/btm/analytics/businesstxn/unbounduris').success(function(data) {
      $scope.unbounduris = data;
      $scope.candidateCount = Object.keys(data).length;
    });

    $scope.addBusinessTxn = function() {
      var defn = {
        filter: {
          inclusions: $scope.selecteduris
        }
      };
      $http.put('/hawkular/btm/config/businesstxn/'+$scope.newBTxnName, defn).success(function(data) {
        $location.path('config/'+$scope.newBTxnName);
      });
    };

    $scope.ignoreBusinessTxn = function() {
      var defn = {
        level: 'Ignore',
        filter: {
          inclusions: $scope.selecteduris
        }
      };
      $http.put('/hawkular/btm/config/businesstxn/'+$scope.newBTxnName, defn).success(function(data) {
        $location.path('config/'+$scope.newBTxnName);
      });
    };

    $scope.selectionChanged = function(uri) {
      if ($scope.selecteduris.contains(uri)) {
        $scope.selecteduris.remove(uri);
      } else {
        $scope.selecteduris.add(uri);
      }
    };

  }]);

}
