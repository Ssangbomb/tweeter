/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

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
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
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
    
    console.log('the form has submitted');
  
    const urlencoded = $form.serialize();
    console.log(urlencoded);
  
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded
    }).then((newtweet) => {
      console.log(newtweet);
      loadTweets(newtweet);
    })
  }) 
  loadTweets();
});
