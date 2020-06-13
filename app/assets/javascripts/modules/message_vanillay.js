window.addEventListener("load", function () {
  // HTML要素の読み込みが終わったら発動

  const main_chat = document.querySelector('.main-chat'); // 検索フォーム

  if (!main_chat) return null; // チャット画面でないなら実行しない

  const messageForm = document.querySelector('.form'); // メッセージ送信フォーム
  const messageList = document.querySelector('.messages'); // メッセージ一覧

  const buildHTML = (message, user) => {
    let image = '';
    if (message.image.url) {
      image = `<img class="Message__image" src="${message.image.url}">`;
    }
    let html =
      `<div class="message" data-message-id="${message.id}">
          <div class="message__info">
            <p class="message__user-name">
            ${user.name}
            </p>
            <p class="message__created-at">
            ${message.created_at}
            </p>
          </div>
          <div class="message__body">
            <p class="message__content">
            ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }

  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const url = location.pathname;

    const XHR = new XMLHttpRequest();

    window.commonFunction.startAjax({ // jqueryの$.ajaxの代わり（common.jsに記述）
      xhr: XHR, // さっきnewしたものを渡す
      type: "POST",
      url: url,
      formData: formData
    });

    // -----ajaxが終わったときの処理はここから-----

    XHR.onload = () => {
      console.log("done");


      if (XHR.status != 200) { // ajaxに失敗した時の処理はこの中
        console.log("failed");
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      // ajaxに成功した時の処理はここから下
      message = XHR.response.message;
      user = XHR.response.user;
      const html = buildHTML(message, user);

      messageList.insertAdjacentHTML("beforeend", html);
      messageForm.reset();
      document.querySelector('input[type="submit"]').disabled = false;
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: 'smooth'
      })

    }
  })

  let reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.message:last').data("message-id");

    const XHR = new XMLHttpRequest();

    window.commonFunction.startAjax({ // jqueryの$.ajaxの代わり（common.jsに記述）
      xhr: XHR, // さっきnewしたものを渡す
      type: "GET",
      url: "api/messages",
      data: {
        id: last_message_id
      },
      formData: null
    });

    XHR.onload = () => {
      console.log("done");


      if (XHR.status != 200) { // ajaxに失敗した時の処理はこの中
        console.log("failed");
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      const messages = XHR.response.messages;

      console.table(messages.length);

      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let html = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(message => {
          console.log(message);
          html += buildHTML(message, user);
        });
        messageList.insertAdjacentHTML("beforeend", html);
        messageList.scrollTo({
          top: messageList.scrollHeight,
          behavior: 'smooth'
        })
      }

    }

  }


  setInterval(reloadMessages, 3000);

})
