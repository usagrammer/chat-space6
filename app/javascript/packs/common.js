// -----jquery風にajaxをするための関数ここから-----
export const startAjax = ({
  xhr, // xmlHtmlRequestオブジェクト
  type, // HTTPメソッド
  url, // パス
  data = {}, // paramsに渡すもの（formDataがnullじゃないときはこれをformDataに加える）
  formData = null // formDataオブジェクト
}) => {
  url += "?" // paramsに送るにはまずパスの後ろに?をつける
  Object.keys(data).forEach(function (key) { // ハッシュ（data）をeachで回す
    url += appendParams(key, data[key], formData, url);
  })
  xhr.open(type, url, true);
  xhr.responseType = "json";
  xhr.send(formData); // ajax開始
}

// -----jquery風にajaxをするための関数ここまで-----

// -----paramsにdataを追加する関数ここから-----

const appendParams = (key, object, formData = null, url = null) => { // クエリを作成したりformDataにappendしたりする
  const objType = Object.prototype.toString.call(object); // keyに対するvalue（object）のタイプ（ハッシュ、配列、それ以外）を調べる
  let appendTarget;
  if (formData != null) { // formDataが渡されている場合、クエリ作成ではなくformDataにappendしていく
    appendTarget = formData;
  } else { // formDataは渡されていない場合、dataを元にクエリを作成していく
    appendTarget = new URLSearchParams(); // クエリを作成するのに便利なオブジェクト
  }
  switch (objType) {
    case "[object Object]": // valueがハッシュのとき
      Object.keys(object).forEach(function (obj_key) { // ハッシュ（data）をeachで回す
        appendTarget.append(`${key}[${obj_key}]`, object[obj_key]);
      })
      break;
    case "[object Array]": // valueが配列のとき
      object.forEach(function (value) {
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

// -----paramsにdataを追加する関数ここまで-----
