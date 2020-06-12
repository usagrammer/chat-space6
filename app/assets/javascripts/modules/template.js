return false

window.addEventListener("load", function () {
  // HTML要素の読み込みが終わったら発動

  const startAjax = ({ // jquery風にajaxをする関数
    xhr, // xmlHtmlRequestオブジェクト
    type, // HTTPメソッド
    url, // パス
    data, // paramsに渡すもの（formDataがnullじゃないときはこれをformDataに加える）
    formData = null // formDataオブジェクト
  }) => {
    if (formData == null) { // formDataがnullのとき、dataをparamsに加える
      url += "?" // paramsに送るにはまずパスの後ろに?をつける
      Object.keys(data).forEach(function (key) { // ハッシュ（data）をeachで回す
        url += `${key}=${data[key]}&`; // パスに「key=value&」を足すことでparamsに送られる
      })
    } else { // formDataがnullじゃないとき、formDataにdataを加える
      if (type == "GET") console.log("typeはGET以外にしてください");
      Object.keys(data).forEach(function (key) { // ハッシュ（data）をeachで回す
        formData.append(key, data[key]);
      })
    }
    xhr.open(type, url, true);
    xhr.responseType = "json";
    xhr.send(formData); // ajax開始
  }

  const eventTarget = document.querySelector('#UserSearch__field');
  const form = document.querySelector('form');

  eventTarget.addEventListener("input", function (e) {
    const input = this.value;

    const XHR = new XMLHttpRequest();

    startAjax({
      xhr: XHR,
      type: "GET", //  jqueryと同じ
      url: "/users", // jqueryと同じ
      data: [ //  配列で囲ったハッシュ型で書く
        {
          key: "input",
          value: input
        },
        {
          key: "data2",
          value: "hoge"
        }
      ],
      formData: null, // formDataを渡すときはこっちに書く
    });

    XHR.onload = () => {
      console.log("done");

      if (XHR.status != 200) { // ajaxに失敗した時
        console.log("failed");
        alert(`Error ${XHR.status}: ${XHR.statusText}`); // e.g. 404: Not Found
        return null;
      }

      // ajaxに成功した時
      console.log("success");
    }

  })

})
