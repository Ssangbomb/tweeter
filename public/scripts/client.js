/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet"> 
      <header>
      <div class="header-top">
        <div><img src=${tweet.user.avatars}>${tweet.user.name}</div>
        <div class="email">${tweet.user.handle}</div>
      </div>              
      <div class="header-bottom">${tweet.content.text}</div>
      </header>
      <footer>
      ${timeago.format(tweet.created_at)}
      <div>
        <i class="fa-regular fa-flag"></i>
        <i class="fa-solid fa-arrows-spin"></i>
        <i class="fa-regular fa-heart"></i>
      </div> 
      </footer>
    </article>
    `);
    return $tweet;
  }

  const $tweetContainer = $("#tweet-container");

  const renderTweets = function(tweets) {
    for(let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  }
  
  
  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((tweets) =>{
      renderTweets(tweets);
    })
  }



  const $form = $('#new-tweet-form');

  $form.on('submit', (event) => {
    event.preventDefault();

    const urlencoded = $form.serialize();

    const formVali = urlencoded.substring(5);
    if( formVali === '' || formVali === null) {
      $('.error').slideDown();
      $('.error').html('You give me a empty tweet');
    } else if (formVali.length > 140) {
      $('.error').slideDown();
      $('.error').html('This is too long for your tweet');
    } else {
      $('.counter').html(140);
      $('#area').val('');
      $('.error').slideUp();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: urlencoded
      }).then((newtweet) => {
        loadTweets(newtweet);
      })
    }
  
  }) 
  loadTweets();
});
