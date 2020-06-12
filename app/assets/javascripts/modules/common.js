window.addEventListener("load", function () {
  // HTML要素の読み込みが終わったら発動

  // -----jquery風にajaxをするための関数ここから-----

  const startAjax = ({
    xhr, // xmlHtmlRequestオブジェクト
    type, // HTTPメソッド
    url, // パス
    data = {}, // paramsに渡すもの（formDataがnullじゃないときはこれをformDataに加える）
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

  window.commonFunction = window.commonFunction || {};
  window.commonFunction.startAjax = startAjax;

  // -----jquery風にajaxをするための関数ここまで-----

})
