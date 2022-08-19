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

  const $form = $(".textarea");

  $form.submit(function (event) {
    event.preventDefault();
    //cleans up any leftover error messages
    $("#empty").slideUp();
    $("#long-error").slideUp();
    $(".new-tweet").slideUp();
    //form validation checks
    const newTweetData = event.target[0].value;
    if (!newTweetData) {
      $("#empty").slideDown();
      $(".new-tweet").slideDown();
      return;
    }

    if (newTweetData.length > 140) {
      $("#long-error").slideDown();
      $(".new-tweet").slideDown();
      return;
    }


    // AJAX

    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize()
    }).then(function () {
      loadTweets();
    });
  });

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/tweets",
    }).then(function (tweet) {
      renderTweets(tweet);
      //resets the form
      document.querySelector(".textarea").reset();
    });
  };
  loadTweets();
});