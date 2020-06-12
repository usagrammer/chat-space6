$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html =
        `<div class="message" data-message-id="${message.id}">
          <div class="message__info">
            <p class="message__user-name">
            ${message.user_name}
            </p>
            <p class="message__created-at">
            ${message.created_at}
            </p>
          </div>
          <div class="message__body">
            <p class="message__content">
            ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="message" data-message-id="${message.id}">
          <div class="message__info">
            <p class="message__user-name">
            ${message.user_name}
            </p>
            <p class="message__created-at">
            ${message.created_at}
            </p>
          </div>
          <div class="message__body">
            <p class="message__content">
            ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.form').on('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function (data) {
        let html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        });
        $('.form')[0].reset();
        $('.form__submit').prop('disabled', false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
        $('.form__submit').prop('disabled', false);
      });
  });

});
