
  function add() {
    var red = new fabric.Rect({
      top: 100, left: 0, width: 80, height: 50, fill: 'red' });
    var blue = new fabric.Rect({
      top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
    var green = new fabric.Rect({
      top: 100, left: 100, width: 60, height: 60, fill: 'green' });
    canvas.add(red, blue, green);
  }

  var $ = function(id){return document.getElementById(id)};

  var canvas = this.__canvas = new fabric.Canvas('c');
  var grid = 50;

  for (var i = 0; i < (2000 / grid); i++) {
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, 2000], { stroke: '#ccc', selectable: false }));
    canvas.add(new fabric.Line([ 0, i * grid, 2000, i * grid], { stroke: '#ccc', selectable: false }))
  }

  function addTable()
{
  var table = new fabric.Rect({
    height: 100,
    width: 250,
    fill: 'purple',
    left: 0,
    rx: 20,
    ry: 20,
    lockScalingX: true,
    lockScalingY: true,
    snapAngle: 45
  });

  canvas.add(table);
}

function addSquareSeat()
{
  var numberToIterate = document.getElementById("squareIterations").value;
  xBuffer = 200;
  yBuffer = 200;

  xPos = 100;
  yPos = 100;

  for (i = 0; i < numberToIterate; i++)
  {
    if (i == 8)
    {
      yPos = 300;
      xPos = 100;
    }

    if (i == 16)
    {
      yPos = 500;
      xPos = 100;
    }

    if (i == 24)
    {
      yPos = 700;
      xPos = 100;
    }

    var rect1 = new fabric.Rect({
      height: 80,
      width: 100,
      fill: 'grey',
      left: 0,
      rx: 20,
      ry: 20
    });
    
    var circle1 = new fabric.Circle({
      radius: 25,
      fill: 'pink',
      left: 25,
      top: -20
    });

    

    var group = new fabric.Group([ rect1, circle1 ], {
      left: xPos += xBuffer,
      top: yPos,
      snapAngle: 45
    });

    canvas.add(group);

    
  }
}


 // var red = new fabric.Rect({
   // top: 100, left: 0, width: 80, height: 50, fill: 'red' });
  //var blue = new fabric.Rect({
    //top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
  //var green = new fabric.Rect({
    //top: 100, left: 100, width: 60, height: 60, fill: 'green' });
  
    fabric.Object.prototype.transparentCorners = false;
  
  //  canvas.add(red, blue, green)
  
    var group = $('group'),
      ungroup = $('ungroup'),
      multiselect = $('multiselect'),
      addmore = $('addmore'),
      discard = $('discard');

     addmore.onclick = add;

      multiselect.onclick = function() {
        canvas.discardActiveObject();
        var sel = new fabric.ActiveSelection(canvas.getObjects(), {
          canvas: canvas,
        });
        canvas.setActiveObject(sel);
        canvas.requestRenderAll();
      }

      group.onclick = function() {
        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type !== 'activeSelection') {
          return;
        }
        canvas.getActiveObject().toGroup();
        canvas.requestRenderAll();
      }

      ungroup.onclick = function() {
        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type !== 'group') {
          return;
        }
        canvas.getActiveObject().toActiveSelection();
        canvas.requestRenderAll();
      }

      discard.onclick = function() {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }

      canvas.on('object:moving', function(options) { 
        console.log("ASD");
        options.target.set({
          left: Math.round(options.target.left / grid) * grid,
          top: Math.round(options.target.top / grid) * grid
        });
      });

      canvas.on('mouse:down', function(options) {
        if (options.target) 
        {
          thingToRemove = options.target;
          console.log('an object was clicked! ', options.target.type);
        }
      });
      
      function clickToRemove()
      {
        canvas.remove(thingToRemove);
      }