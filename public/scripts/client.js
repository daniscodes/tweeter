// DOM using jQuery
const createTweetElement = function (data) {
  let $tweet = $(`
  <article class="tweet">
  <header>
    <div class="user">
      <img
        src="${data.user.avatars}"
        alt="">
      <p>${data.user.name}</p>
    </div>
    <h4>${data.user.handle}</h4>
  </header>
  <p>${data.content.text}</p>
  <footer>
    <span>${data.created_at}</span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>
  `);
  return $tweet;
};

const renderTweet = function (data) {
  for (let tweet of data) {
    $('#tweets-bin').append(createTweetElement(tweet));
  }
}

// AJAX
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      console.log(tweets)
      return tweets;
    })
    .catch((err) => {
      console.log("There was an ERROR ", err)
    })
};

loadTweets()

$(document).ready(function () {

  console.log('document is readyyy')

  $('form.composeTweet').on('submit', function (event) {
    console.log('tweet submitted!');
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function (tweet) {
        console.log('Tweet has been sent to database :)');
        $('.tweet-text').val('')
      })
      .catch((err) => {
        console.log('There was an error', err)
      })
  });

  renderTweet(data);
}); 