export default {
  beijin () {
    var canvas = document.getElementById("cas");
    var ctx = canvas.getContext("2d");

    resize();
    window.onresize = resize;

    function resize () {
      canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    var RAF = (function () {
      // return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      //   window.setTimeout(callback, 1000 / 60);
      // };
      return function (callback) {
        window.setInterval(callback, 1000 / 60);
      };
    })();

    // 鼠标活动时，获取鼠标坐标
    var warea = { x: null, y: null, max: 20000 };
    window.onmousemove = function (e) {
      e = e || window.event;
      warea.x = e.clientX;
      warea.y = e.clientY;
    };
    window.onmouseout = function (e) {
      warea.x = null;
      warea.y = null;
      // console.log(warea)
    };

    // 添加粒子
    // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
    var dots = [];
    for (var i = 0; i < 300; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var xa = Math.random() * 2 - 1;
      var ya = Math.random() * 2 - 1;
      dots.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        max: 6000
      })
    }

    // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
    setTimeout(function () {
      animate();
    }, 100);
    
    //每一帧循环的逻辑
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //绘制矩形
      
      // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
      var ndots = [warea].concat(dots);

      dots.forEach( dot => {

        // 粒子位移
        dot.x += dot.xa;
        dot.y += dot.ya;

        // 遇到边界将加速度反向
        dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
        dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;

        // 绘制点
        var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        var color = "rgba(255,255,255," + alpha + ")";
        ctx.fillStyle = color;
        ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

        for (var i = 0; i < ndots.length; i++) {
          var d2 = ndots[i];
          if (dot === d2 || d2.x === null || d2.y === null) continue;
          var xc = dot.x - d2.x;
          var yc = dot.y - d2.y;
          // 两个粒子之间的距离
          var dis = xc * xc + yc * yc;
          // 距离比
          var ratio;
          // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
          if (dis < d2.max) {
            // 如果是鼠标，则让粒子向鼠标的位置移动
            if (d2 === warea && dis > (d2.max / 2)) {
              dot.x -= xc * 0.03;
              dot.y -= yc * 0.03;
            }
            // 计算距离比
            ratio = (d2.max - dis) / d2.max;
            // 画线
            ctx.beginPath();
            ctx.lineWidth = ratio / 2;
            ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }

        // 将已经计算过的粒子从数组中删除
        ndots.splice(ndots.indexOf(dot), 1);
      })
    }
    RAF(animate)
  },

  canvas () {
    function Star (id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random() * 2) + 1;
      var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
      this.color = "rgba(255,255,255," + alpha + ")";
    }

    Star.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    };

    Star.prototype.move = function () {
      this.y -= 0.15;
      if (this.y <= -10) this.y = HEIGHT + 10;
      this.draw();
    };

    Star.prototype.die = function () {
      stars[this.id] = null;
      delete stars[this.id];
    };

    function Dot (id, x, y, r) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random() * 5) + 1;
      this.maxLinks = 2;
      this.speed = 0.5;
      this.a = 0.5;
      this.aReduction = 0.005;
      this.color = "rgba(255,255,255," + this.a + ")";
      this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

      this.dir = Math.floor(Math.random() * 140) + 200;
    }

    Dot.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    };

    Dot.prototype.link = function () {
      if (this.id == 0) return;
      var previousDot1 = getPreviousDot(this.id, 1);
      var previousDot2 = getPreviousDot(this.id, 2);
      var previousDot3 = getPreviousDot(this.id, 3);
      if (!previousDot1) return;
      ctx.strokeStyle = this.linkColor;
      ctx.moveTo(previousDot1.x, previousDot1.y);
      ctx.beginPath();
      ctx.lineTo(this.x, this.y);
      if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
      if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
      ctx.stroke();
      ctx.closePath();
    };

    function getPreviousDot (id, stepback) {
      if (id == 0 || id - stepback < 0) return false;
      if (typeof dots[id - stepback] != "undefined")
        return dots[id - stepback];
      else return false; //getPreviousDot(id - stepback);
    }

    Dot.prototype.move = function () {
      this.a -= this.aReduction;
      if (this.a <= 0) {
        this.die();
        return;
      }
      this.color = "rgba(255,255,255," + this.a + ")";
      this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
      (this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed),
        (this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed);

      this.draw();
      this.link();
    };

    Dot.prototype.die = function () {
      dots[this.id] = null;
      delete dots[this.id];
    };

    var canvas = document.getElementById("cas"),
      ctx = canvas.getContext("2d"),
      WIDTH,
      HEIGHT,
      mouseMoving = false,
      mouseMoveChecker,
      mouseX,
      mouseY,
      stars = [],
      initStarsPopulation = 80,
      dots = [],
      dotsMinDist = 2,
      maxDistFromCursor = 50;

    setCanvasSize();
    init();

    function setCanvasSize () {
      (WIDTH = document.documentElement.clientWidth),
        (HEIGHT = document.documentElement.clientHeight);

      canvas.setAttribute("width", WIDTH);
      canvas.setAttribute("height", HEIGHT);
    }

    function init () {
      ctx.strokeStyle = "white";
      ctx.shadowColor = "white";
      for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(
          i,
          Math.floor(Math.random() * WIDTH),
          Math.floor(Math.random() * HEIGHT)
        );
        //stars[i].draw();
      }
      ctx.shadowBlur = 0;
      animate();
    }

    function animate () {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      for (var i in stars) {
        stars[i].move();
      }
      for (var i in dots) {
        dots[i].move();
      }
      drawIfMouseMoving();
      requestAnimationFrame(animate);
    }

    window.onmousemove = function (e) {
      mouseMoving = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      clearInterval(mouseMoveChecker);
      mouseMoveChecker = setTimeout(function () {
        mouseMoving = false;
      }, 100);
    };

    function drawIfMouseMoving () {
      if (!mouseMoving) return;

      if (dots.length == 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return;
      }

      var previousDot = getPreviousDot(dots.length, 1);
      var prevX = previousDot.x;
      var prevY = previousDot.y;

      var diffX = Math.abs(prevX - mouseX);
      var diffY = Math.abs(prevY - mouseY);

      if (diffX < dotsMinDist || diffY < dotsMinDist) return;

      var xVariation = Math.random() > 0.5 ? -1 : 1;
      xVariation =
        xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
      var yVariation = Math.random() > 0.5 ? -1 : 1;
      yVariation =
        yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
      dots[dots.length] = new Dot(
        dots.length,
        mouseX + xVariation,
        mouseY + yVariation
      );
      dots[dots.length - 1].draw();
      dots[dots.length - 1].link();
    }

    //setInterval(drawIfMouseMoving, 17);

    function degToRad (deg) {
      return deg * (Math.PI / 180);
    }
  },
}
