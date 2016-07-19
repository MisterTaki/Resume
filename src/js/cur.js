function getParam(index) {
  var $activePage = $("#fullpage .active"),
      $lis = $("#navigation li"),
      curIndex = typeof (index) == "number" ? index : $(".section").index($activePage),
      curWidth = $lis.eq(curIndex).width(),
      curLeft = $lis.eq(curIndex).offset().left - $lis.parent().offset().left;
  return {
    curWidth: curWidth,
    curLeft: curLeft
  };
}

function switchCur(index) {
  var params = getParam(index);
  $(".cur-bar").animate({
    left: params.curLeft,
    width: params.curWidth
  }, 400);
}

$(function () {
  switchCur(0);
  $("#navigation li").on("mouseenter", function () {

    var parentWidth = $(this).parent().offset().left,
        width = $(this).width(),
        left = $(this).offset().left - parentWidth;

    $(".cur-bar").stop().animate({
      left: left,
      width: width,
    }, 400, function(){
      $(this).addClass("animate");
    });
  });
  $("#navigation").on("mouseleave", function () {

    var params = getParam();

    $(".cur-bar").stop().animate({
      left: params.curLeft,
      width: params.curWidth,
    }, 800, function(){
      $(this).removeClass("animate");
    });
  });
});
