$(function() {
  function buildHTML(message){
    var html = `<div class="messages__box">
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
                  </div>
                </div>`

    return html;
  }
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
    .fail(function(){s
      alert('error');
    })
  })
  var $scrollBottom = $('.messages')
  $('.form__submit').click(function() {
    $('.messages').animate({scrollTop: $scrollBottom[0].scrollHeight}, 'fast');
  })  
});