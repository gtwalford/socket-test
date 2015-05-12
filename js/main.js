$(document).ready(function() {
  console.log('App Started');

  var socket = io('http://brand.nioinstances.com'),
      room = 'gabriel',
      $window = $(window),
      $circleChart = $('#circle-chart'),
      $barChart = $('#bar-chart');

  var bars = new BarChart();
  var circles = new CircleChart();

  socket.on('connect', function() {
    console.log('Connected');
    socket.emit('ready', 'gabriel');
  });

  socket.on('recvData', function(data) {
    var dataObj = JSON.parse(data);

    circles.addNewCircle(dataObj.count);
    bars.addNewBar(dataObj.count);
  });

  function CircleChart() {
    this.addNewCircle = function(radius) {
      $circleChart.append('<div class="circle"></div>');
      $circleChart.children().last().animate({
        width: radius*2 + 'px', 
        height: radius*2 + 'px', 
        'margin-top': -radius + 'px',
        'margin-left': -radius + 'px'
      }, 1000);

      this.removeOldCircles();
    };

    this.removeOldCircles = function() {
      var circles = $circleChart.children();
      if ( circles.length > 2 ) {
        circles.first().animate({opacity: 0}, 1000, function(){
           this.remove();
        });
      }
    };
  };

  function BarChart() {
    this.addNewBar = function(height) {
      console.log('Add New Circle = ', height);
    };

    this.removeOldBar = function() {
    };
  };
  
});
