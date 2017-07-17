import $ from 'jquery';
import Vue from 'vue';

function FauxPlaceholder(el, binding) {
  if(!ElementSupportAttribute('input','placeholder')) {
    var $input = $(el);
    const clone = $input.clone();
    clone.removeAttr('v-placeholder').removeAttr('type').removeAttr('placeholder')
      .attr('value', $input.attr('placeholder'))
      .attr('id', $input.attr('id')+ '-faux')
      .attr('style', "display:none;")
      .attr('type', 'text');
    $input.after(clone);
    // $input.after('<input id="'+$input.attr('id')+'-faux" style="display:none;" type="text" value="' + $input.attr('placeholder') + '" />');
    var $faux = $('#'+$input.attr('id')+'-faux');
    $faux.show().attr('class', $input.attr('class'));
    $input.hide();

    $faux.focus(function() {
      $faux.hide();
      $input.show().focus();
    });

    $input.blur(function() {
      if($input.val() === '') {
        $input.hide();
        $faux.show();
      }
    });
  }
}
function ElementSupportAttribute(elm, attr) {
  var test = document.createElement(elm);
  return attr in test;
}
export default {
  inserted: function(el, binding){
    FauxPlaceholder(el, binding);
  }
}
