
var square = document.getElementById('square');

square.addEventListener('mousedown', dragStart);
square.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    e.preventDefault();
    offsetX = e.clientX - square.offsetLeft;
    offsetY = e.clientY - square.offsetTop;
    document.addEventListener('mousemove', drag);
}

function drag(e) {
    e.preventDefault();
    square.style.left = (e.clientX - offsetX) + 'px';
    square.style.top = (e.clientY - offsetY) + 'px';
}

function dragEnd(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', drag);
}


const triangle = document.getElementById('triangle');
let dragging = false;
let initialX, initialY;
let offsetX = 0, offsetY = 0;

triangle.addEventListener('mousedown', function (e) {
  dragging = true;
  initialX = e.clientX - offsetX;
  initialY = e.clientY - offsetY;
});

document.addEventListener('mouseup', function (e) {
  dragging = false;
});

document.addEventListener('mousemove', function (e) {
  if (dragging) {
    const currentX = e.clientX - initialX;
    const currentY = e.clientY - initialY;
    offsetX = currentX;
    offsetY = currentY;
    triangle.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }
});

document.addEventListener('wheel', function (e) {
  e.preventDefault();

  const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
  const currentWidth = parseFloat(window.getComputedStyle(triangle).width);
  const currentHeight = parseFloat(window.getComputedStyle(triangle).height);

  triangle.style.width = currentWidth * scaleFactor + 'px';
  triangle.style.height = currentHeight * scaleFactor + 'px';
});

