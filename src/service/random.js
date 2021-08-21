import Taro from "@tarojs/taro";

var datas = [];
var index = -1;

const defaultLen = 20;

const random = (pre) => {
  // 判断是否需要初始化
  const isNeedInit = index === -1

  if (isNeedInit) {
    return new Promise((resolve, reject) => {
      initRandomDatas(pre).then(() => {
        resolve(nextData());
      })
    })
  }

  return new Promise((resolve, reject) => {
    let i = index + 1;
    console.log("i ", i)
    if(i >= datas.length){
      index = -1
      random(pre).then(res => {
        resolve(res)
      })
    } else {
      resolve(nextData())
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
          datas = dataList
          console.log(" datas " ,datas, res.data)
          resolve(dataList);
        });
      });
  })
}

function nextData(){
  index++;
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