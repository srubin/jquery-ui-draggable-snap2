jquery-ui-draggable-snap2
=========================

Itty bitty extension to jquery ui's draggable that allows the user to specify which sides of the container it should snap to.

I thought it was crazy that you couldn't specify which sides of an element you wanted a jQuery ui draggable to snap to (maybe I'm missing something?) so this is a simple extension of draggable to allow for this more specific snapping.

## Usage
When creating a draggable, you can now pass the following options:

  `snap2:` same as `snap` in draggable
  
  `snap2Mode:` same as `snapMode` in draggable
  
  `snap2Tolerance:` same as `snapTolerace` in draggable
  
  `snap2Sides:` a string or array of letters `t`, `b`, `l`, and/or `r` indicating which sides to snap to (top, bottom, left, and right respectively)
  
## Example

```javascript
$(".elt").draggable({
  snap2: ".container",
  snap2Mode: "inner",
  snap2Tolerance: 50,
  snap2Sides: "tb"
})
```

The elements with class `elt` will now snap only to the top and bottom of elements with class `.container`.

## Note

This code was copied directly from the jquery-ui source and modified ever-so-slightly.
