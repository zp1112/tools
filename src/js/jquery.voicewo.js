/**
 * Created by Administrator on 2017/7/4.
 */
/*
 SWFObject v2.2 <http://code.google.com/p/swfobject/>
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */


/*
 insertAtCaret
 Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

import swfobject from 'swfobject';
(function ($) {
  $.fn.extend({
    insertAtCaret: function (myValue) {
      var $t = $(this)[0];
      if (document.selection) {
        this.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        this.focus();
      }
      else if ($t.selectionStart || $t.selectionStart == '0') {
        var startPos = $t.selectionStart;
        var endPos = $t.selectionEnd;
        var scrollTop = $t.scrollTop;
        $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
        this.focus();
        $t.selectionStart = startPos + myValue.length;
        $t.selectionEnd = startPos + myValue.length;
        $t.scrollTop = scrollTop;
      }
      else {
        this.value += myValue;
        this.focus();
      }
    }
  })
})(jQuery);

/*
 voicewo
 Copyright (c) 2014 yufan
 Email yufan1029@qq.com
 Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

(function ($) {
  //flash DOM
  function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
      return window[movieName];
    }
    else {
      return document[movieName];
    }
  }

  //version
  var version = '0.1';

  //language pack
  var lang = {
    startspeak: '请开始说话',
    nospeak: '没有听到说话',
    nettimeout: '网络连接超时',
    flashdisablemic: 'Flash禁用麦克风',
    nomic: '没有麦克风设备',
    wait: '请稍候',
    cancel: '取消',
    ok: '确定',
    retry: '重试',
    clouderror: '云端错误'
  }

  // These methods can be called by adding them as the first argument in the voicewo plugin call
  var methods = {

    init: function (options) {
      return this.each(function () {

        // Create a reference to the jQuery DOM object
        var $this = $(this);

        // Clone the original DOM object
        var $clone = $this.clone();

        // Setup the default options
        var settings = $.extend({
          // Options
          id: $this.attr('id'),		// The ID of the DOM object
          buttonImage: 'btn.png',  			// The path to an image to use for the Flash browse button
          swf: 'Main.swf',  		// The path to the voicewo SWF file
          outputId: 'content',			// The ID of the DOM object to output for voicewo result
          width: 92,					// The width of the browse button
          height: 25,					// The height of the browse button
          preventCaching: true,					// Adds a random value to the Flash URL to prevent caching of it (conflicts with existing parameters)
          debug: false,              	// Turn on voicewo debugging mode
          tipPositon: 'bottom',				// The positon of the tip for the Flash browse button

          // Events
          overrideEvents: []             		// (Array) A list of default event handlers to skip
          /*
           onInit									// Triggered when init
           onFallback								// Triggered when fallback
           onTip									// Triggered when tip
           onRecording								// Triggered when recording
           onOutput         						// Triggered when output
           onRestart								// Triggered when restart
           onCancel								// Triggered when cancel
           onSwfready								// Triggered when swfready
           onDestroy								// Triggered when destroy
           */
        }, options);
        // Detect if Flash is available
        var playerVersion = swfobject.getFlashPlayerVersion();
        var flashInstalled = (playerVersion.major >= 9);
        console.log(playerVersion);

        if (flashInstalled) {
          // Add the settings to the elements data object
          $this.data('voicewo', settings);

          // The wrapper
          var $wrapper = $('#' + settings.id);
          $wrapper.css({'position': 'relative', 'width': settings.width, 'height': settings.height});

          // Create the swf
          var $swf = $('<span />', {'id': settings.id + '-swf'});
          $wrapper.append($swf);

          // Update the flash url if needed
          if (settings.preventCaching) {
            settings.swf = settings.swf + (settings.swf.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
          }
          swfobject.embedSWF(settings.swf, settings.id + '-swf', settings.width, settings.height, '9.0.0', null, {
            id: settings.id,
            debug: settings.debug
          }, {wmode: 'transparent', menu: 'true', allowScriptAccess: 'always', quality: 'high'}, {
            id: settings.id + '-swf',
            name: settings.id + '-swf',
            styleclass: settings.id + '-swf',
            style: 'position: absolute; z-index:1;margin-left:167px;'
          });

          $swf = $('#' + settings.id + '-swf');
          // $(document).click(function (event) {
          //   if ($(event.target).closest('#' + settings.id).length <= 0) {
          //     $('#' + settings.id).voicewo('cancel');
          //   }
          // });
          // Call the user-defined init event handler
          if (settings.onInit) settings.onInit.call(this);

        } else {

          // Call the fallback function
          if (settings.onFallback) settings.onFallback.call(this);

        }
      });

    },

    // tip
    tip: function (type, code) {
      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');
        // Call the user-defined event handler
        if (settings.onTip) settings.onTip.call(this, type, code);

        settings={};
        return true;
      });

    },

    // recording
    recording: function (value) {
      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');

        // Call the default event handler
        if ($.inArray('onRecording', settings.overrideEvents) < 0) {
          value = value /2;
          (value > 50) ? value = 50 : value = parseInt(value);
        }

        // Call the user-defined event handler
        if (settings.onRecording) settings.onRecording.call(this, value);

        settings = {};
        return true;
      });

    },

    // output
    output: function (value) {

      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');

        // Call the user-defined event handler
        if (settings.onOutput) settings.onOutput.call(this, value);

        settings = {};
        return true;
      });

    },

    // restart
    restart: function () {

      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');

        // Call the default event handler
        if ($.inArray('onRestart', settings.overrideEvents) < 0) {
          //Call flash restart interface
          if ($('#' + settings.id).data('swfready') == 'true') thisMovie(settings.id + '-swf').doRestart();
        }

        // Call the user-defined event handler
        if (settings.onRestart) settings.onRestart.call(this);

        settings = {};
        return true;
      });

    },

    // cancel
    cancel: function () {
      console.log('cancel');
      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');

        // Call the default event handler
        if ($.inArray('onCancel', settings.overrideEvents) < 0) {
          //Call flash cancel interface
          if ($('#' + settings.id).data('swfready') == 'true') thisMovie(settings.id + '-swf').doCancel();

          //Init tip
          $('#' + settings.id).voicewo('tip', 'init', '');
        }

        // Call the user-defined event handler
        if (settings.onCancel) settings.onCancel.call(this);

        settings = {};
        return true;
      });

    },

    // swfready
    swfready: function () {
      console.log("ready")
      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');

        // Call the default event handler
        if ($.inArray('onSwfready', settings.overrideEvents) < 0) {
          // set data
          $('#' + settings.id).data('swfready', 'true');
        }

        // Call the user-defined event handler
        if (settings.onSwfready) settings.onSwfready.call(this);

        settings = {};
        return true;
      });

    },

    // Revert the DOM object back to its original state
    destroy: function () {

      this.each(function () {
        // Create a reference to the jQuery DOM object
        var $this = $(this),
          settings = $this.data('voicewo');

        // Call the default event handler
        if ($.inArray('onDestroy', settings.overrideEvents) < 0) {
          $this.removeData('voicewo');
          $this.removeData('swfready');
        }

        // Call the user-defined event handler
        if (settings.onDestroy) settings.onDestroy.call(this);

        settings = {};
        return true;
      });

    }

  }

  $.fn.voicewo = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('The method ' + method + ' does not exist in $.voicewo');
    }

  }

})(jQuery);
