$(function () {
  //隐藏载入动画
  $('#loading').fadeOut(800);
  //配置particlesJS
  var config = {
    "particles": {
      "number": {
        "value": 18,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 50,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 300,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 5,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 800,
          "size": 80,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
  //定义anchors
  var anchors = {
    one : "home",
    two : "education",
    three : "skill",
    four : "project",
    five : "opus",
    six : "more"
  };
  //初始化particlesJS
  for (var key in anchors) {
    if (anchors.hasOwnProperty(key)) {
      particlesJS(anchors[key], config);
    }
  }
  //初始化fullpage
  $('#fullpage').fullpage({
    navigation: true,
    anchors: Object.keys(anchors),
    navigationPosition: 'right',
    navigationTooltips: ['首页', '教育背景', '专业技能', '项目经历', '个人作品', '更多信息'],
    onLeave: function (index, nextIndex, direction) {
      var $pages = $('.section');
      for (var i = 0; i < $pages.length; ++i) {
        if (i + 1 !== nextIndex) {
          $($pages[i]).addClass('leaving');
        } else {
          $($pages[i]).removeClass('leaving');
        }
      }
      switchCur(nextIndex-1);
    }
  });
});
