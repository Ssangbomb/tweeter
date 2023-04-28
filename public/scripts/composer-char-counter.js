$(document).ready(function() {
  // --- our code goes here ---
  const textArea =  $(area);
  textArea.on('input', function(){
    let num = 140 - this.value.length;
    $('.counter').html(num);
    if(num < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }
  })
});