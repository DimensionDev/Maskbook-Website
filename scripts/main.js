jQuery(document).ready(function($) {
  var i18n = $.i18n()
  i18n.load({
    en: 'i18n/en.json',
    zh: 'i18n/zh.json'
  })  
  var localStorageLang = window.localStorage.getItem('mask_language')
  var lang = localStorageLang ? 
    localStorageLang : ['zh', 'en'].includes(navigator.language) ? 
    navigator.language : 'en'
  setLocale(lang)

  $('a[href$="/install"]').attr("href", function() {
    const agent = navigator.userAgent;
    if (/Chrome/i.test(agent)) {
      return "https://chrome.google.com/webstore/detail/jkoeaghipilijlahjplgbfiocjhldnap";
    } else if (/Firefox/i.test(agent)) {
      return "https://addons.mozilla.org/firefox/addon/maskbook";
    }
    return "/download-links";
  });

  $(".navbar-toggler").click(function() {
    $([this, "header.navbar", ".navbar-nav"]).toggleClass("open");
    $(document.body).toggleClass("no-scroll");
  });

  $.getJSON("/assets/reasons.json", function(data) {
    var keys = Object.keys(data);

    var $reasons = $("section.reasons");
    var $reason = $(".reason dl", $reasons);
    var $prev = $(".reason .prev", $reasons);
    var $next = $(".reason .next", $reasons);
    var $group = $(".card-group > section", $reasons);
    var $navbar = $("nav", $reasons);
    var $dummy = $(".card", $reasons).clone();

    function setCardGroup(index) {
      $group.empty();
      $reasons.data("index", index);
      $reason.find("dt span").text(index + 1);
      $reason.find("dd").text(keys[index]);
      $navbar
        .children()
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $.each(data[keys[index]], function(index, item) {
        var $card = $dummy.clone();
        $card.find("i.brand-logo").addClass(item.title.replace(/ /g, "-").toLowerCase());
        $card.find("h4").text(item.title);
        $card.find("time").text(item.time);
        $card.find("dd").html(item.content.replace(/--/gi, "<b>You-Know-Who</b>").replace(/\[(.+?)\]/g, "<i>$1</i>"));
        $card.attr("title", item.href);
        $card.click(function() {
          location.assign(item.href);
        });
        $group.append($card);
      });
      $group.parent().animate({ scrollLeft: 0 }, 1000);
    }
    setCardGroup(0);

    $prev.click(function() {
      var index = $reasons.data("index");
      setCardGroup(index === 0 ? keys.length - 1 : index - 1);
    });
    $next.click(function() {
      var index = $reasons.data("index");
      setCardGroup(index >= keys.length - 1 ? 0 : index + 1);
    });
    $reason.click(function() {
      $next.click();
    });
    $navbar.on("click", "button", function() {
      setCardGroup($(this).index());
    });
  });

  $('#i18n-en').on("click", function() {
    setLocale('en', true)
  })

  $('#i18n-zh').on("click", function() {
    setLocale('zh', true)
  })  

  function setLocale (lang, cache = false) {
    setTimeout(() => {
      i18n.locale = lang
      if (cache) window.localStorage.setItem('mask_language', lang)
      $('body').i18n()
    }, 1000)
  }  
});
