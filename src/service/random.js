import Taro from "@tarojs/taro";

var datas = [];
var index = -1;

const defaultLen = 20;

const random = (pre) => {
  return new Promise((resolve, reject) => {
    if(index == -1){
      initRandomDatas(pre).then(dataList => {
        datas = dataList;
        resolve(nextData());
      })
    } else {
      resolve(nextData());
    }
  })
}

function initRandomDatas(pre){
  const db = Taro.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('audios')
      .count().then(res => {
        var randomIds = [];
        for(var i= 0; i< defaultLen; i++) {
            randomIds[i] = randomId(pre, res.total);
        }
        const _ = db.command;
        db.collection("audios").where({
          id: _.in(randomIds)
        }).get().then(res => {
          let dataList = [];
          res.data.forEach(function (item, index, array) {
            dataList.push({id: item.id, ch: {path: item.chinese.audio_path, text: item.chinese.text}, en: {path: item.english.audio_path, text: item.english.text}});
          });
          resolve(dataList);
        });
      });
  })
}

function nextData(){
  index++;
  if(index > datas.length){
    initRandomDatas();
    index = 0;
  }
  return datas[index];
}

function randomId(pre, total){
  var randomInt = Math.floor(Math.random() * total);
  if(randomInt == pre){
    randomInt = Math.floor(Math.random() * total);
  }
  return randomInt;
}

export {
  random
}