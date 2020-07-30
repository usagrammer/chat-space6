import {
  startAjax
} from './common.js';

window.addEventListener("load", function () {
  // HTML要素の読み込みが終わったら発動

  const searchField = document.querySelector('#UserSearch__field'); // 検索フォーム

  if (!searchField) return null; // グループ作成・編集ページでないなら実行しない

  const searchResult = document.querySelector('#UserSearchResult'); // 検索結果
  const memberList = document.querySelector('.ChatMembers'); // メンバー一覧
  const groupForm = document.querySelector('form'); // フォーム

  const addUserToResult = (user) => { // 検索結果にユーザーを追加
    let html = `
                  <div class="ChatMember">
                    <p class="ChatMember__name">${user.name}</p>
                    <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>
                  `;
    searchResult.insertAdjacentHTML("beforeend", html);
  }

  const addNoUser = () => { // 検索結果がゼロのとき
    let html = `
                  <div class="ChatMember">
                    <p class="ChatMember__name">ユーザーが見つかりません</p>
                  </div>
                  `;
    searchResult.insertAdjacentHTML("beforeend", html);
  }

  const addUserToMember = (name, id) => { // 追加ボタン押した時
    let html = `
                  <div class="ChatMember">
                    <p class="ChatMember__name">${name}</p>
                    <input name="group[user_ids][]" type="hidden" value="${id}" />
                    <div class="ChatMember__remove ChatMember__button">削除</div>
                  </div>
                  `;
    memberList.insertAdjacentHTML("beforeend", html);
  }

  const buildUserIdList = () => { // 検索結果がゼロのとき
    const user_hidden_fields = document.querySelectorAll('input[name="group[user_ids][]"]');
    let user_ids = [];
    user_hidden_fields.forEach(user_hidden_field => {
      const user_id = Number(user_hidden_field.value);
      user_ids.push(user_id);
    })
    user_ids.push("hoge");
    return user_ids;
  }

  let user_ids = buildUserIdList();

  function buildArrayQuery(name, array) {
    let query = "?";
    array.forEach(value => {
      query += `${name}[]=${value}&`
    });
    return query;
  }

  function buildHashQuery(hash_name, hash) {
    let query = "?";
    Object.keys(hash).forEach(function (hash_key) { // ハッシュ（data）をeachで回す
      query += `${hash_name}[${hash_key}]=${hash[hash_key]}&`
    })
    return query;
  }

  searchField.addEventListener("input", function (e) {
    const input = this.value;

    if (!input) { // 検索ワードが空文字のとき
      searchResult.innerHTML = ""; // 検索結果リセット
      return null;
    }

    const XHR = new XMLHttpRequest();

    startAjax({ // jqueryの$.ajaxの代わり（common.jsに記述）
      xhr: XHR, // さっきnewしたものを渡す
      type: "GET",
      url: "/users",
      data: {
        input: input,
        "group[user_ids]": user_ids,
        obj: {
          key: 1,
          val: 2
        }
      },
      formData: null
    });

    // -----ajaxが終わったときの処理はここから-----

    XHR.onload = () => {
      console.log("done");

      searchResult.innerHTML = ""; // 検索結果リセット

      if (XHR.status != 200) { // ajaxに失敗した時の処理はこの中
        console.log("failed");
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      // ajaxに成功した時の処理はここから下
      console.log("success");

      const users = XHR.response.users; // 検索でヒットしたuserたち
      if (users.length == 0) addNoUser(); // 検索結果がゼロ件のときは専用メッセージを表示
      users.forEach(user => { // 検索結果が1件以上のときは結果にuserを表示していく
        addUserToResult(user);
      });
    }
  })

  searchResult.addEventListener("click", function (e) {
    if (e.target.classList.contains('ChatMember__add')) { // 追加ボタンを押した時
      const user_id = e.target.dataset.userId; // user_idを取得
      const user_name = e.target.dataset.userName; // user名を取得
      addUserToMember(user_name, user_id); // メンバー一覧にuserを追加
      searchResult.innerHTML = ""; // 検索結果をリセット
    }
  })

  memberList.addEventListener("click", function (e) {
    if (e.target.classList.contains('ChatMember__remove')) { // 削除ボタンを押した時
      e.target.parentNode.remove(); // メンバー一覧からuserを削除
    }
  });

})
