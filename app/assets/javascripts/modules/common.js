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
    url += "?" // paramsに送るにはまずパスの後ろに?をつける
    Object.keys(data).forEach(function (key) { // ハッシュ（data）をeachで回す
      url += appendData(key, data[key], formData, url);
    })
    xhr.open(type, url, true);
    xhr.responseType = "json";
    xhr.send(formData); // ajax開始
  }

  const appendData = (key, object, formData = null, url = null) => { // クエリを作成する
    const objType = Object.prototype.toString.call(object); // keyに対するvalue（object）のタイプ（ハッシュ、配列、それ以外）を調べる
    let appendTarget;
    if (formData != null) {
      appendTarget = formData;
    } else {
      appendTarget = new URLSearchParams(); // クエリを作成するのに便利なオブジェクト
    }
    switch (objType) {
      case "[object Object]": // valueがハッシュのとき
        Object.keys(object).forEach(function (obj_key) { // ハッシュ（data）をeachで回す
          appendTarget.append(`${key}[${obj_key}]`, object[obj_key]);
        })
        break;
      case "[object Array]": // valueが配列のとき
        object.forEach(function (value) { // ハッシュ（data）をeachで回す
          appendTarget.append(`${key}[]`, value);
        })
        break;
      default: // valueがハッシュでも配列でもないとき
        appendTarget.append(key, object);
    }

    if (formData != null) {
      return null;
    } else {
      return appendTarget.toString() + "&";
    }

  }

  const appendForm = (formData, key, object) => {
    const objType = Object.prototype.toString.call(object); // keyに対するvalue（object）のタイプ（ハッシュ、配列、それ以外）を調べる
    switch (objType) {
      case "[object Object]": // valueがハッシュのとき
        Object.keys(object).forEach(function (obj_key) { // ハッシュ（data）をeachで回す
          formData.append(`${key}[${obj_key}]`, object[obj_key]);
        })
        break;
      case "[object Array]": // valueが配列のとき
        object.forEach(function (value) { // ハッシュ（data）をeachで回す
          formData.append(`${key}[]`, value);
        })
        break;
      default: // valueがハッシュでも配列でもないとき
        formData.append(key, object);
    }
  }

  window.commonFunction = window.commonFunction || {};
  window.commonFunction.startAjax = startAjax;
  // window.commonFunction.buildQuery = buildQuery;

  // -----jquery風にajaxをするための関数ここまで-----

})
