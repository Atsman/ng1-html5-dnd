import angular from 'angular';
import lang from './lang';

angular
  .module('ng1-html5-dnd')
  .directive('ngDroppable', ngDroppableDirective);

function ngDroppableDirective() {
  return {
    restrict: 'A',
    scope: {
      onDragEnter: '=',
      onDragOver: '=',
      onDrop: '=',
      allowDrop: '=',
    },
    controller: ngDroppableController,
  };
}

/* @ngInject */
function ngDroppableController($rootScope, $scope, $element) {
  const element = $element[0];

  initialize();

  function initialize() {
    validateInputs($scope);
    syncDOM();
    watchInputs();
    $element.on('$destroy', onDestroy);
  }

  function validateInputs({ onDragEnter, onDragOver, onDrop, allowDrop }) {
    if (onDragEnter && !lang.isFunction(onDragEnter)) {
      throw new Error('onDragEnter must be a Function');
    }
    if (onDragOver && !lang.isFunction(onDragOver)) {
      throw new Error('onDragOver must be a Function');
    }
    if (onDrop && !lang.isFunction(onDrop)) {
      throw new Error('onDrop must be a Function');
    }
    if (allowDrop && !lang.isFunction(allowDrop)) {
      throw new Error('allowDrop must be a Function');
    }
  }

  function watchInputs() {
    $scope.$watchGroup(['onDragEnter', 'onDragOver', 'onDrop'], syncDOM);
  }

  function syncDOM() {
    element.ondragenter = $scope.onDragEnter;
    element.ondragover = onDragOverWrapper;
    element.ondrop = onDropWrapper;
  }

  function onDragOverWrapper(e) {
    const data = getData(e);
    const allowDrop = $scope.allowDrop(e, data);
    if (allowDrop) {
      e.preventDefault();
    }
    if ($scope.onDragOver) {
      return $scope.onDragOver(e, data);
    }
    return !allowDrop;
  }

  function onDropWrapper(e) {
    const data = getData(e);
    if ($scope.onDrop) {
      return $scope.onDrop(e, data);
    }
    return null;
  }

  function getData(e) {
    const stringValue = e.dataTransfer.getData('text/plain');
    if (stringValue) {
      return JSON.parse(stringValue);
    }
    return null;
  }

  function onDestroy() {
    element.ondragenter = null;
    element.ondragover = null;
    element.ondrop = null;
  }
}
