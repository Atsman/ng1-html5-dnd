# ng1-html5-dnd

An Angular 1 tiny wrapper over native html5 drag and drop functionality.

## Installation

```bash
npm i --save ng1-html5-dnd
```

## Usage

Then in application with import support.

```javascript
import angular from 'angular';
import 'ng1-html5-dnd';

angular
  .module('app-module-name', ['ng1-html5-dnd'])
  .component('AppComponent', {
    template: `
      <div ng-draggable
           allow-drag="ctrl.allowDrag"
           on-drag-start="ctrl.onDragStart"
           on-drag="ctrl.onDrag"
           on-drag-end="ctrl.onDragEnd"
           dragEffect="'copy'"
      >
        Draggable div
      </div>

      <div ng-droppable
           allow-drop="ctrl.allowDrop"
           on-drag-enter="ctrl.onDragEnter"
           on-drag-over="ctrl.onDragOver"
           on-drop="ctrl.onDrop"
      >
        Droppable zone
      </div>
    `,
    controller: AppController,
  });

function AppController() {
  const ctrl = this;

  ctrl.allowDrag = function() {
    return true; 
  };

  ctrl.onDragStart = function(e) {
    console.log('onDragStart', e);
  };
  
  ctrl.onDragEnd = function(e) {
    console.log('onDragEnd', e);
  };
  
  ctrl.onDrag = function(e) {
    console.log('onDrag1', e);
  };

  ctrl.allowDrop = function(e) {
    return true;
  };
  
  ctrl.onDrop = function(e) {
    e.preventDefault();
    console.log('onDrop', e);
  };
  
  ctrl.onDragOver = function(e) {
    e.preventDefault();
    console.log('onDragOver', e);
  };
  
  ctrl.onDragEnter = function(e) {
    console.log('onDragEnter', e);
  };
}
```

## Draggable directive api

Example:

```html
<div 
  ng-draggable
  allow-drag="ctrl.allowDrag"
  on-drag-start="ctrl.onDragStart"
  on-drag="ctrl.onDrag"
  on-drag-end="ctrl.onDragEnd"
  dragEffect="copy"
>
  Draggable div
</div>
```

Directive params:

* allowDrag {Function} - allow/disallow dragging
* onDragStart {Function} - handler of drag start event
* onDrag {Function} - handler of drag event
* onDragEnd {Function} - handler of drag end event
* dragEffect {String} - effect to be used. Automaticaly sets during drag start.
[see Drag Operations](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drageffects)

## Droppable directive api

Example:

```html
<div 
  ng-droppable
  allow-drop="ctrl.allowDrop"
  on-drag-enter="ctrl.onDragEnter"
  on-drag-over="ctrl.onDragOver"
  on-drop="ctrl.onDrop"
>
  Droppable zone
</div>
```

Directive params:

* onDragEnter {Function} - handler of drag enter event
* onDragOver {Function} - handler of drag over event
* onDrop {Function} - handler of drop event
* allowDrop {Function} - allow/disallow drop. It automaticaly prevent event in drag over handler. If nothing passed, you have to manually control process in onDragOver. (see [Specifying Drop Targets](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets))
