(function(){
  var canvas = document.getElementById('bannerCanvas');
  var ctx = canvas.getContext('2d');
  var mouse = {x:-9999, y:-9999};
  var particles = [];
  var W, H, tileW, tileH;
  var img = new Image();
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  img.src = 'pattern-tile.png';

  function build(){
    var rect = canvas.getBoundingClientRect();
    W = canvas.width = Math.round(rect.width);
    H = canvas.height = Math.round(rect.height);
    var scale = H / img.height;
    tileW = img.width * scale;
    tileH = H;
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var octx = off.getContext('2d');
    for (var x = 0; x < W + tileW; x += tileW){
      octx.drawImage(img, x, 0, tileW, tileH);
    }
    var data = octx.getImageData(0,0,W,H).data;
    var step = W < 500 ? 3 : 4;
    particles = [];
    for (var y=0; y<H; y+=step){
      for (var x2=0; x2<W; x2+=step){
        var i = (y*W+x2)*4;
        var a = data[i+3];
        if (a > 100){
          var ang = Math.random()*Math.PI*2;
          var rad = 40 + Math.random()*60;
          particles.push({
            tx:x2, ty:y,
            x: reduced ? x2 : x2 + Math.cos(ang)*rad,
            y: reduced ? y : y + Math.sin(ang)*rad,
            vx:0, vy:0,
            c: 'rgb(' + data[i] + ',' + data[i+1] + ',' + data[i+2] + ')'
          });
        }
      }
    }
  }

  function frame(){
    ctx.clearRect(0,0,W,H);
    var repelR = 46, repelStrength = 2.2, spring = 0.05, friction = 0.83;
    for (var i=0;i<particles.length;i++){
      var p = particles[i];
      var dx = p.x - mouse.x, dy = p.y - mouse.y;
      var dist = Math.sqrt(dx*dx+dy*dy) || 0.01;
      if (dist < repelR){
        var f = (repelR - dist)/repelR;
        p.vx += (dx/dist)*f*repelStrength;
        p.vy += (dy/dist)*f*repelStrength;
      }
      p.vx += (p.tx - p.x)*spring;
      p.vy += (p.ty - p.y)*spring;
      p.vx *= friction; p.vy *= friction;
      p.x += p.vx; p.y += p.vy;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.3, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  function setMouse(clientX, clientY){
    var rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
  }

  canvas.addEventListener('mousemove', function(e){ setMouse(e.clientX, e.clientY); });
  canvas.addEventListener('mouseleave', function(){ mouse.x=-9999; mouse.y=-9999; });
  canvas.addEventListener('touchmove', function(e){
    if (e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
  }, {passive:true});
  canvas.addEventListener('touchend', function(){ mouse.x=-9999; mouse.y=-9999; });

  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });

  img.onload = function(){
    build();
    requestAnimationFrame(frame);
  };
})();
