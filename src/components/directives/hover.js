/**
 * Created by Candy on 2017/3/7.
 */
import $ from 'jquery';

export default {
  inserted: function (el, binding) {
    $(el).hover(function(){
      const el2 = $(`${binding.value.name}`).eq(binding.value.index);
      if(el2.css("display") === 'none'){
        el2.css("display", "block");
      } else{
        el2.css("display", "none");
      }
    });
  }
}
