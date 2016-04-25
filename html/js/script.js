/*********** MAIN SCRIPTS ***************/
function arrowPosition() {
  var leftSpace = $('.slick-active .container').offset().left;
  $('.topSlider .slick-prev').css('left', leftSpace+33);
  $('.topSlider .slick-next').css('right', leftSpace+33);
}
function selectFocuse() {
  $("select").unbind('blur').blur(function(){
    var _ = $(this);
    var drop = $(this).parent();
    setTimeout(function(){
      var a = $(drop).find(".fs-dropdown-item_selected");
      if(!$(a).hasClass("fs-dropdown-item_placeholder") && $(a).text().length!==0){
        _.next().addClass("choosen");
      } else{
        _.next().removeClass("choosen");
      }
    },400);
  });

  $("select").change(function(){
    var __ = $(this);
    var drop1 = __.parent();
    setTimeout(function(){
      var b = $(drop1).find(".fs-dropdown-item_selected");
      if(!$(b).hasClass("fs-dropdown-item_placeholder") && $(b).text().length!==0){
        __.next().addClass("choosen");
      } else{
        __.next().removeClass("choosen");
      }
    },400);
  });
  
  $(".fs-dropdown-selected").blur(function(){
    var _ = $(this);
    var drop = $(this).parent();
    setTimeout(function(){
      var a = $(drop).find(".fs-dropdown-item_selected");
      if(!$(a).hasClass("fs-dropdown-item_placeholder") && $(a).text().length!==0){
        _.addClass("choosen");
      } else{
        _.removeClass("choosen");
      }
    },400);
  });
  $(".fs-dropdown").blur(function(){
    var _ = $(this);
  });

  $(".fs-dropdown-options").click(function(){
    var _ = $(this);
    var drop = $(this).parent();
    setTimeout(function(){
      var a = $(drop).find(".fs-dropdown-item_selected");
      if(!$(a).hasClass("fs-dropdown-item_placeholder") && $(a).text().length!==0){
        _.prev().addClass("choosen");
      } else{
        _.prev().removeClass("choosen");
      }
    },400);
  });
}

function testimonialList(){
  if($(window).width()<767){
    $(".testimonialList").scrollbar("destroy");
    if(!$(".testimonialList").hasClass("slick-initialized")){
      $(".testimonialList").slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: false,
        adaptiveHeight:true,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
      })
    }
  } else{
    if($(".testimonialList").hasClass("slick-initialized")){
      $(".testimonialList").slick("unslick");
    }
    $(".testimonialList").scrollbar();
  }
}    

function galleryList(){
  if($(window).width()<767){
     $(".galleryThumbListWrapper").scrollbar("destroy");
      $(".galleryThumbList").width("auto");
    if(!$(".galleryThumbList").hasClass("slick-initialized")){
      $(".galleryThumbList").slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: false,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
      })
    }
  } else{
    if($(".galleryThumbList").hasClass("slick-initialized")){
      $(".galleryThumbList").slick("unslick");
    }
    $(".galleryThumbListWrapper").scrollbar({
      horizontal: true,
    });
  }
}

function updateGalleryPhoto(){
  var src = $(".galleryThumbList li.active img").attr("src");
  $(".imgPreview img").attr("src", src);
}

function galleryWidth() {
    var count = $(".galleryThumbList li").length;
    var itemLength = $(".galleryThumbList li").width();
    $(".galleryThumbList").width(count*itemLength);
}
function popup() {
  $("#popupHide").click(function(){
    $("#popupWrapper").hide();
  });            
  $(".showPopup").click(function(){
    $("#popupWrapper").show();
  });
}
(function($) {
  $.fn.fitImage = function() {
    var _ = this;
    var height, width, parHeight, parWidth,src;
    src = _.attr("src");
    parWidth = _.parent().width();
    parHeight = _.parent().height();
    width = _[0].naturalWidth;
    height = _[0].naturalHeight;
    if(width != 0 && height != 0){
    } else{
      var tmpImg = new Image();
      tmpImg.onload = function() {
      height = tmpImg.height
      width = tmpImg.width;
    };
    tmpImg.src = _.attr('src');
    }
    if (width/height <= parWidth/parHeight) {
        _.height("auto");
        _.width("100%");
        _.css("visibility","visible");
      } else{
       _.width("auto");
       _.height("100%");
       _.css("visibility","visible");
      }
  };
})(jQuery);  

(function($) {
  $.fn.containImage = function() {
    var _ = this;
    var height, width, parHeight, parWidth,src;
    src = _.attr("src");
    parWidth = _.parent().width();
    parHeight = _.parent().height();
    width = _[0].naturalWidth;
    height = _[0].naturalHeight;
    if(width != 0 && height != 0){
    } else{
      var tmpImg = new Image();
      tmpImg.onload = function() {
      height = tmpImg.height
      width = tmpImg.width;
    };
    tmpImg.src = _.attr('src');
    }
    if (width/height >= parWidth/parHeight) {
        _.height("auto");
        _.width("100%");
        _.css("visibility","visible");
      } else{
       _.width("auto");
       _.height("100%");
       _.css("visibility","visible");
      }
  };
})(jQuery);

 function scrollHeightReview() {
  var reviews = $('.testimonialList > li');
  if (reviews.length <= 2) {
    $('.testimonialList ').css('height', 'auto');
    } else {
      $('.testimonialList').css('height', '660px');
   }
 }

$(document).ready(function(){
  /*********** HEADER *******/
	$('.navToggle').click(function() {
		$(this).toggleClass('active');
		$(this).next().slideToggle();
	});

	$('.dropDownToggle').click(function() {
		if ($(window).width()< 767) {
			$(this).parent().toggleClass('active');
			$(this).next().slideToggle();
		};
	});
});
