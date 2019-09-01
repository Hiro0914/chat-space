$(function() {
  function buildHTML(message){
    // 条件演算子を使ってmessage.imageにtrueならHTML要素、falseなら空の値を代入。
    var image = message.image ? `<img "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="messages__box" data-message-id="${message.id}">
                  <div class="messages__upper-info">
                    <div class="messages__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="messages__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-messsages">
                    <p class="lower-messages__content">
                      ${message.content}
                    </p>
                   ${ image }
                  </div>
                </div>`

    return html;
  }

  var reloadMessages = function() {
    // group一覧画面でのみ自動更新イベントが発火するよう条件分岐
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      // カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    // カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.messages__box:last').data("message-id")
      console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        // ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        // dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
  var $scrollBottom = $('.messages')
  $('.form__submit').click(function() {
    $('.messages').animate({scrollTop: $scrollBottom[0].scrollHeight}, 'fast');
  })
  setInterval(reloadMessages, 10000);
});