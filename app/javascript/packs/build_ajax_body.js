// -----jquery風にajaxをするための関数ここから-----
export const startAjaxXHR = ({
  xhr, // xmlHtmlRequestオブジェクト
  type, // HTTPメソッド
  url, // パス
  data = {}, // paramsに渡すもの（formDataがnullじゃないときはこれをformDataに加える）
  formData = null // formDataオブジェクト
}) => {
  if (formData == null) {
    url += "?"; // paramsに送るにはまずパスの後ろに?をつける
    url += buildAjaxBody(data, formData).toString() + "&";
  }
  xhr.open(type, url, true);
  xhr.responseType = "json";
  xhr.send(formData); // ajax開始
}

// -----jquery風にajaxをするための関数ここまで-----

// -----paramsにdataを追加する関数ここから-----

export const buildAjaxBody = (data, formData = null) => { // クエリを作成したりformDataにappendしたりする

  Object.keys(data).forEach(function (key) { // ハッシュ（data）をeachで回す
    const objType = Object.prototype.toString.call(data[key]); // keyに対するvalue（object）のタイプ（ハッシュ、配列、それ以外）を調べる
    let appendTarget;
    if (formData != null) { // formDataが渡されている場合、クエリ作成ではなくformDataにappendしていく
      appendTarget = formData;
    } else { // formDataは渡されていない場合、dataを元にクエリを作成していく
      appendTarget = new URLSearchParams(); // クエリを作成するのに便利なオブジェクト
    }
    switch (objType) {
      case "[object Object]": // valueがハッシュのとき
        Object.keys(data[key]).forEach(function (obj_key) { // ハッシュ（data）をeachで回す
          appendTarget.append(`${key}[${obj_key}]`, data[key][obj_key]);
        })
        break;
      case "[object Array]": // valueが配列のとき
        data[key].forEach(function (value) {
          appendTarget.append(`${key}[]`, value);
        })
        break;
      default: // valueがハッシュでも配列でもないとき
        appendTarget.append(key, data[key]);
    }
  })

  if (formData != null) {
    return null;
  } else {
    return appendTarget;
  }

}

// -----paramsにdataを追加する関数ここまで-----
