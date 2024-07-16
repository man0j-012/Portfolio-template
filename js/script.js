$(document).ready(function () {
  // Flexslider
  $(".flexslider").flexslider({
    animation: "slide",
    start: function (slider) {
      $("body").removeClass("loading");
    },
  });

  // Waypoints
  var waypointAnimate = function () {
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }
                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };
  waypointAnimate();

  // Owl Carousel
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    smartSpeed: 800,
    autoHeight: true,
    navText: [
      "<i class='icon-arrow-left2 owl-direction'></i>",
      "<i class='icon-arrow-right2 owl-direction'></i>",
    ],
  });

  // Counter
  $(".js-counter").countTo({
    formatter: function (value, options) {
      return value.toFixed(options.decimals);
    },
  });

  // Typed.js
  var typed = new Typed(".typed-words", {
    strings: [
      "a CS Student",
      "a Full Stack Developer",
      "a Technophile",
      "a Software Engineer",
      "a Data Engineer",
    ],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1000,
    startDelay: 1000,
    loop: true,
    showCursor: true,
  });

  // Particles.js (or your custom particle effect script)
  let resizeReset = function () {
    w = canvasBody.width = window.innerWidth;
    h = canvasBody.height = window.innerHeight;
  };

  const opts = {
    particleColor: "rgb(44,152,240)",
    lineColor: "rgb(44,152,240)",
    particleAmount: 20,
    defaultSpeed: 0.8,
    variantSpeed: 1,
    defaultRadius: 2,
    variantRadius: 2,
    linkRadius: 200,
  };

  window.addEventListener("resize", function () {
    deBouncer();
  });

  let deBouncer = function () {
    clearTimeout(tid);
    tid = setTimeout(function () {
      resizeReset();
    }, delay);
  };

  let checkDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  let linkPoints = function (point1, hubs) {
    for (let i = 0; i < hubs.length; i++) {
      let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
      let opacity = 1 - distance / opts.linkRadius;
      if (opacity > 0) {
        drawArea.lineWidth = 0.5;
        drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
        drawArea.beginPath();
        drawArea.moveTo(point1.x, point1.y);
        drawArea.lineTo(hubs[i].x, hubs[i].y);
        drawArea.closePath();
        drawArea.stroke();
      }
    }
  };

  Particle = function (xPos, yPos) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
    this.update = function () {
      this.border();
      this.x += this.vector.x;
      this.y += this.vector.y;
    };
    this.border = function () {
      if (this.x >= w || this.x <= 0) {
        this.vector.x *= -1;
      }
      if (this.y >= h || this.y <= 0) {
        this.vector.y *= -1;
      }
      if (this.x > w) this.x = w;
      if (this.y > h) this.y = h;
      if (this.x < 0) this.x = 0;
      if (this.y < 0) this.y = 0;
    };
    this.draw = function () {
      drawArea.beginPath();
      drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      drawArea.closePath();
      drawArea.fillStyle = this.color;
      drawArea.fill();
    };
  };

  function setup() {
    particles = [];
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++) {
      particles.push(new Particle());
    }
    window.requestAnimationFrame(loop);
  }

  function loop() {
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
      linkPoints(particles[i], particles);
    }
  }

  const canvasBody = document.getElementById("canvas"),
    drawArea = canvasBody.getContext("2d");
  let delay = 200,
    tid,
    rgb = opts.lineColor.match(/\d+/g);
  resizeReset();
  setup();
});
