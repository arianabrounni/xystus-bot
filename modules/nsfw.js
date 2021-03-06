/// <reference path="../typings/node/node.d.ts"/>
(function () {
  var request = require('request');
  var _ = require('lodash');

  var sendNsfwMedia = function (imgType, bot, chatId) {
    request('http://api.' + imgType + '.ru/noise/1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var imageArray = JSON.parse(body);
        if (imageArray.length > 0) {
          var url = 'http://media.' + imgType + '.ru/' + imageArray[0].preview;
          var image = request(url);
          bot.sendPhoto(chatId, image).catch(function() {});
          return;
        }
      }
      bot.sendMessage(chatId, 'Image Error').catch(function() {});;
    });
  };

  module.exports = {
    isSupported: function (message) {
      return !!message.text && (message.text === '\/boobs' || message.text.indexOf('\/boobs ') === 0 || message.text === '\/butts' || message.text.indexOf('\/butts ') === 0);
    },
    proccess: function (message, bot) {
      var imgType = message.text.indexOf('\/boobs') === 0 ? 'oboobs' : 'obutts';
      _.times(5, function () {
        sendNsfwMedia(imgType, bot, message.chat.id);
      });
    }
  };
})();