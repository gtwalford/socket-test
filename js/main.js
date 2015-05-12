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
        width: radius*4 + 'px', 
        height: radius*4 + 'px', 
        'margin-top': -(radius*2) + 'px',
        'margin-left': -(radius*2) + 'px'
      }, 1000);

      this.removeOldCircles();
    };

    this.removeOldCircles = function() {
      var circles = $circleChart.children();
      if ( circles.length >= 5 ) {
        circles.first().animate({opacity: 0}, 500, function(){
           this.remove();
        });
      }
    };
  };

  function BarChart() {
    this.addNewBar = function(width) {
      this.removeOldBar();

      $barChart.append('<div class="bar"></div>');
      $barChart.children().last().animate({width: width + '%'}, 1000);
    };

    this.removeOldBar = function() {
      var bars = $barChart.children();

      if( bars.length >= 20 ) {
        bars.first().animate({height: 0}, 500, function() {
          this.remove();
        });
      }
    };
  };
  
});
