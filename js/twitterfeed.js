//==============================================================================
//twitter timeline.
var catchTwitter = '';
var countTweets = 3;
var tweetCounter = 1;
var windowSmall = 0;



if (typeof $('.twitterFeed').html() != 'undefined') {

  if ($(window).width() < 990) {

    windowSmall = 1;
  }
  if (navigator.userAgent.indexOf('iPhone') != -1) {
    windowSmall = 2;
  }

  $('.twitterFeed').css('display', 'none');

  $.getScript("https://platform.twitter.com/widgets.js", function(data) {

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var list = document.querySelector('.twitterFeed');

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          var list_values = [].slice.call(list.children).map(function(node) {
            return node.innerHTML;
          }).filter(function(s) {
            if (s === '<br />') {
              return false;
            } else {
              return true;
            }
          });

          $('.twitterFeed .col3').css('padding-bottom', '0');
          ++tweetCounter;

          var catchTwitter = $('iframe').contents().find("body").html();

          if (tweetCounter == countTweets) {

            var allTweets = $(catchTwitter);
            var allDates = $(catchTwitter);
            var tweetExtract = $('.timeline-Tweet-text', allTweets);
            var tweetImgs = $('.NaturalImage-image', allTweets);
            var cardImgs = $('img.u-block', allTweets);
            var countBorders = $('li.customisable-border', allTweets);
            var countMediaCard = $('MediaCard', allTweets);

            setImg5 = [];
            //Find the img type 5.
            var num = 0;
            $(tweetExtract).each(function(index, data) {
              if (data.nextElementSibling.innerHTML) {
                num++;
                var imgZ5 = data.nextElementSibling.innerHTML;

                if (imgZ5.indexOf('NaturalImage-image') != -1) {
                  var getTweetimg = $('.NaturalImage-image', $(imgZ5));
                  setImg5.push('<div class="twitImg" style="overflow:hidden;padding:0;margin:15px;"><img style="height:160px" src="' + $(getTweetimg).attr('src') + '"/></div>');
                }
                if (imgZ5.indexOf('u-block') != -1) {
                  var getTweetimg = $('img.u-block', $(imgZ5));
                  if (typeof $(getTweetimg).attr('src') != 'undefined') {
                    setImg5.push('<div class="twitImg" style="overflow:hidden;padding:0;margin:15px;"><img style="height:160px" src="' + $(getTweetimg).attr('src') + '"/></div>');
                  } else {
                    setImg5.push('0');
                  }
                }
              } else {
                setImg5.push('0');
              }
            });

            var tweetDate = $('time', allDates);

            var tdates = [];

            $(tweetDate).each(function(index, data) {
              var p = '<p>' + $(data).attr('aria-label') + '</p>';
              tdates.push(p);
            });

            //------------------------------------------------------
            $(tweetExtract).each(function(index, data2) {
              //------------------------------------------------------

              $('img', data2).remove();
              var i = index + 1;
              var output = data2;
              var hasImg = 0;

              //Add image 5 if any?
              if (setImg5[index] != '0' && setImg5.length != 0 && typeof setImg5[index] != 'undefined') {

                var imgZ5 = $(output);
                output = setImg5[index] + $(imgZ5).html();
                hasImg++;
              }

              if (hasImg == 0) {
                output = '<div class="twitImg" style="overflow:hidden;padding:0;margin:15px;"><img style="max-width:160px;height:160px" src="/wp-content/themes/resolution-boilerplate/imgs/logo.svg"/></div>' + $(output).html();
              }

              if (windowSmall == 1) {

                var putter = output;
                $('.tweetsArea div:nth-child(' + i + ')').html(putter);
                $('.tweetsArea div:nth-child(' + i + ')').html($('.tweetsArea div:nth-child(' + i + ')').html());
              } else {
                if (windowSmall == 2) {
                  $('.tweetsArea div:nth-child(' + i + ')').html(output);
                } else {
                  $('.tweetsArea div:nth-child(' + i + ')').html(output);
                  $('.tweetsDates div:nth-child(' + i + ')').html(tdates[index]);
                  $('.tweetsDates div:nth-child(' + i + ')').css('padding', '0');
                }
              }
              var t = $('.tweetsArea div:nth-child(' + i + ')');
            });

            $('.tweetsDates').css('padding', '0');
            $('.tweetsArea').css('margin-bottom', '0');
            $('.tweetsArea').css('padding-bottom', '0');

            if ($(window).width() < 415) {
              $('.twitImg').css({
                'padding-top': '30px',
                'padding-bottom': '30px',
                'padding-left': '0px',
                'padding-right': '0px',
                'margin-right': '-30px',
                'margin-left': '-30px',
              });
              $('.twitImg img').css({
                'width': '220px',
                'height': 'auto'
              });

              $('.twitterFeed a.btn').css({
                'display': 'inherit',
                'margin-top': '50px'
              });
            }
            $('.twitter-timeline').remove();
            $('.tweetsArea a').css('word-break', 'break-word');
            $('.twitterFeed').fadeIn();
          }
        }
      });
    });

    observer.observe(list, {
      attributes: true,
      childList: true,
      characterData: true
    });

  });
}

//end twitter timeline.
