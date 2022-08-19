$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // DOM using jQuery
const createTweetElement = function (tweet) {

  let $tweet = $(`
  <article class="tweet">
  <header>
    <div class="user">
      <img
        src="${tweet.user.avatars}"
        alt="">
      <p>${tweet.user.name}</p>
    </div>
    <h4>${data.user.handle}</h4>
  </header>
  <main>
  <p>
    ${escape(
      tweet.content.text.length > 60
        ? tweet.content.text.slice(0, 60) +
            "\n" +
            tweet.content.text.slice(60, tweet.content.text.length)
        : tweet.content.text
    )}
  </p>
</main>
  <footer>
    <span>${timeago.format(tweet.created_at)}</span>
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

const renderTweets = function (arr) {
  const $container = $(".tweet-bin");
  $.each(arr, (key) => {
    $container.prepend(createTweetElement(arr[key]));
  });

  return $container;
};
// AJAX
const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweet(tweets)
    })
    .catch((err) => {
      console.log("There was an ERROR ", err)
    })
};

loadTweets()


  console.log('document is readyyy')

  $('form.composeTweet').on('submit', function (event) {
    console.log('tweet submitted!');
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function (tweet) {
        $('.tweet-text').val('')
      })
      .catch((err) => {
        console.log('There was an error!!!!', err)
      })
  });

  renderTweet(data);
}); 