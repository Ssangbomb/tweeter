$(document).ready(function() {
  // --- our code goes here ---
  const textArea =  $(area);
  textArea.on('keypress', function(){
    // console.log(this.value.length);
    let num = 140 - this.value.length;
    const counter = $('.counter').html(num);
    if(num < 0) {
      $('.counter').addClass('negative');
    }
  })
});