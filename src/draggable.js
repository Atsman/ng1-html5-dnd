import angular from 'angular';
import lang from './lang';

angular
  .module('ng1-html5-dnd')
  .directive('ngDraggable', ngDraggableDirective);

function ngDraggableDirective() {
  return {
    restrict: 'A',
    scope: {
      data: '=',
      allowDrag: '=',
      onDragStart: '=',
      onDrag: '=',
      onDragEnd: '=',
      dragEffect: '=',
    },
    controller: ngDraggableController,
    controllerAs: 'vm',
  };
}

/* @ngInject */
function ngDraggableController($rootScope, $scope, $element) {
  const element = $element[0];

  initialize();

  function initialize() {
    validateInputs($scope);
    syncDOM();
    watchInputs();
    $element.on('$destroy', onDestroy);
  }

  function validateInputs({ data, allowDrag, onDragStart, onDrag, onDragEnd, dragEffect }) {
    if (data && (!lang.isObject(data) || !lang.isString(data))) {
      throw new Error('only data of type Object or String is allowed');
    }
    if (allowDrag && !lang.isFunction(allowDrag)) {
      throw new Error('allowDrag must be a Function');
    }
    if (onDragStart && !lang.isFunction(onDragStart)) {
      throw new Error('onDragStart must be a Function');
    }
    if (onDrag && !lang.isFunction(onDrag)) {
      throw new Error('onDrag must be a Function');
    }
    if (onDragEnd && !lang.isFunction(onDragEnd)) {
      throw new Error('onDragEnd must be a Function');
    }
    if (dragEffect && !lang.isString(dragEffect)) {
      throw new Error('dragEffect must be a String');
    }
  }

  function watchInputs() {
    $scope.$watchGroup(['allowDrag', 'onDragStart', 'onDrag', 'onDragEnd', 'dragEffect'], () => {
      validateInputs($scope);
      syncDOM();
    });
  }

  function syncDOM() {
    element.draggable = true;
    element.ondragstart = onDragStartWrapper;
    element.ondrag = $scope.onDrag;
    element.ondragend = $scope.onDragEnd;
  }

  function onDragStartWrapper(e) {
    if (!$scope.allowDrag(e)) {
      return e.preventDefault();
    }

    if ($scope.data) {
      setData(e, $scope.data);
    }

    e.dataTransfer.dropEffect = $scope.dragEffect;
    if ($scope.onDragStart) {
      return $scope.onDragStart(e);
    }
    return true;
  }

  function setData(e, data) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      data,
    }));
  }

  function onDestroy() {
    element.draggable = null;
    element.ondragstart = null;
    element.ondrag = null;
    element.ondragend = null;
  }
}
