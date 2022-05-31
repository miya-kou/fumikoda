/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

// $('.c-top__collectionlist__wrapper').slick({
// 	arrows: true,
// 	dots: false,
// 	arrows: true,
// 	prevArrow: '<button class="c-top__collectionlist__prev"><div class="c-top__collectionlist__arrow_inner"></div></button>',
// 	nextArrow: '<button class="c-top__collectionlist__next"><div class="c-top__collectionlist__arrow_inner"></div></button>',
// 	slidesToShow: 3
// });

$(function() {
	//sticky
	var win = $(window);
	var nav = $('.shopify-section--header');
	var navPosi = $('.shopify-section--header').offset().top;
	win.on('scroll',function(){
	  var scr = win.scrollTop();
	  if(scr > navPosi){
		nav.addClass('sticky');
	  }else{
		nav.removeClass('sticky');
	  }
	});

	var dropdownMenu = $('.c-header__dropdown__container');
	var dropdownMenuPosi = $('.c-header__dropdown__container').offset().top;
	win.on('scroll',function(){
	  var scr = win.scrollTop();
	  if(scr > dropdownMenuPosi){
		dropdownMenu.addClass('sticky');
	  }else{
		dropdownMenu.removeClass('sticky');
	  }
	});
	win.on('load resize', function(){
		if(nav.height() + dropdownMenu.height() > win.height()){
			dropdownMenu.addClass('scroll');
		}else{
			dropdownMenu.removeClass('scroll');
		}
	});

	//アコーディオン
	$(".js-accordion__toggle--parent").on("click", function() {
		$(this).toggleClass("js-active");
		$(this)
		.parent().next(".js-accordion__content--parent")
		.slideToggle();
	});

	//アコーディオン
	$(".js-accordion__toggle").on("click", function() {
		$(this).toggleClass("js-active");
		$(this)
		.parent()
		.next(".js-accordion__content")
		.slideToggle();
		// $(".js-accordion__toggle").not($(this)).removeClass("js-active");;
		// $(".js-accordion__toggle").not($(this)).parent().next(".js-accordion__content").slideUp();
	});

	$(window).on('load resize', function(){
		var w = $(window).width();
		var x = 1139;
		if (w > x) {
			$('.c-top__section__blogpost__right').flickity('destroy')
		} else {
			$('.c-top__section__blogpost__right').flickity({
				prevNextButtons: false,
				pageDots: false,
				wrapAround: false,
				contain: true,
				cellAlign: "center",
				dragThreshold: 8,
				groupCells: true
			});
		}
	})

	// 新規登録画面に生年月日を追加
	$('.p-customers.register').each(function(){
	  // 現在の年月日を取得
	  var time = new Date();
	  var year = time.getFullYear();
	  var month = time.getMonth() + 1;
	  var date = time.getDate();
  
	  // 選択された年月日を取得
	  var selected_year = document.getElementById("year").value;
	  var selected_month = document.getElementById("month").value;
  
	  // 年(初期): 1920〜現在の年 の値を設定
	  for (var i = year; i >= 1920 ; i--) {
		$('#year').append('<option value="' + i + '年">' + i + '</option>');
	  }
  
	  // 月(初期): 1~12 の値を設定
	  for (var j = 1; j <= 12; j++) {
		$('#month').append('<option value="' + j + '月">' + j + '</option>');
	  }
  
	  // 日(初期): 1~31 の値を設定
	  for (var k = 1; k <= 31; k++) {
		$('#date').append('<option value="' + k + '日">' + k + '</option>');
	  }
  
	  // 月(変更)：選択された年に合わせて、適した月の値を選択肢にセットする
	  $('#year').change(function() {
		selected_year = $('#year').val();
  
		// 現在の年が選択された場合、月の選択肢は 1~現在の月 に設定
		// それ以外の場合、1~12 に設定
		var last_month = 12;
		if (selected_year == year) {
		  last_month = month;
		}
		$('#month').children('option').remove();
		$('#month').append('<option value=""></option>');
		for (var n = 1; n <= last_month; n++) {
		  $('#month').append('<option value="' + n + '月">' + n + '</option>');
		}
	  });
  
	  // 日(変更)：選択された年・月に合わせて、適した日の値を選択肢にセットする
	  $('#year,#month').change(function() {
		selected_year = $('#year').val();
		selected_month = $('#month').val();
  
		// 現在の年・月が選択された場合、日の選択肢は 1~現在の日付 に設定
		// それ以外の場合、各月ごとの最終日を判定し、1~最終日 に設定
		if (selected_year == year && selected_month == month ) {
		  var last_date = date;
		}else{
		  // 2月：日の選択肢は1~28日に設定
		  // ※ ただし、閏年の場合は29日に設定
		  if (selected_month == 2) {
			if((Math.floor(selected_year%4 == 0)) && (Math.floor(selected_year%100 != 0)) || (Math.floor(selected_year%400 == 0))){
			  last_date = 29;
			}else{
			  last_date = 28;
			}
  
		  // 4, 6, 9, 11月：日の選択肢は1~30日に設定
		  }else if(selected_month == 4 || selected_month == 6 || selected_month == 9 || selected_month == 11 ){
			last_date = 30;
  
		  // 1, 3, 5, 7, 8, 10, 12月：日の選択肢は1~31日に設定
		  }else{
			last_date = 31;
		  }
		}
  
		$('#date').children('option').remove();
		$('#date').append('<option value=""></option>');
		for (var m = 1; m <= last_date; m++) {
		  $('#date').append('<option value="' + m + '日">' + m + '</option>');
		}
	  });
	});

	// FAQ
	$(".Faq__Question").on("click", function() {
		$(this).toggleClass('open');
		$(this).next().slideToggle('fast');
	});
  
    //商品詳細ページサムネイル（一瞬、全画像が表示されてしまうのを隠す）
    setTimeout(function(){
      $('.Product__SlideshowNav').addClass('show');
    },2000);

	// 商品詳細ページSNSリンク変更
	var load_variant = location.search;
	var load_fb_link = $(".js-target_fb").attr("href");
	var load_tw_link = $(".js-target_tw").attr("href");
	if ( load_variant != "") {
		load_fb_link = load_fb_link + load_variant;
		load_tw_link = load_tw_link + load_variant;
		$(".js-target_fb").attr("href",load_fb_link);
		$(".js-target_tw").attr("href",load_tw_link);
	}

	$(".js-snslink_change").on("click", function() {
		setTimeout(function(){
			var variant = location.search;
			var fb_link = $(".js-target_fb").attr("href");
			var tw_link = $(".js-target_tw").attr("href");
			if ( fb_link.indexOf('?variant') != -1) {
				fb_link = fb_link.substring(0, fb_link.indexOf("?variant"))
			}
			if ( tw_link.indexOf('?variant') != -1) {
				tw_link = tw_link.substring(0, tw_link.indexOf("?variant"))
			}
			fb_link = fb_link + variant;
			tw_link = tw_link + variant;
			$(".js-target_fb").attr("href",fb_link);
			$(".js-target_tw").attr("href",tw_link);
		}, 1);
	});

	// 予約リンク
	$(".ProductForm__BuyButtons").on("click",".timesact-preorder-description a", function() {
		$(".Product__Tabs-reserve_content").css({"overflow":"visible"});
		$(".Product__Tabs-reserve_content .Collapsible__Inner").css({"overflow":"visible","height":"auto"});
		$(".Product__Tabs-reserve_content .Collapsible__Button").attr('aria-expanded', true);
	});
});