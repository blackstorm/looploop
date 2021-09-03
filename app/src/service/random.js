var datas = [];
var index = -1;

const defaultLen = 20;

const random = (pre) => {
  // 判断是否需要初始化
  const isNeedInit = index === -1;

  if (isNeedInit) {
    return new Promise((resolve, reject) => {
      initRandomDatas(pre).then(() => {
        resolve(nextData());
      });
    });
  }

  return new Promise((resolve, reject) => {
    let i = index + 1;
    console.log("i ", i);
    if (i >= datas.length) {
      index = -1;
      random(pre).then((res) => {
        resolve(res);
      });
    } else {
      resolve(nextData());
    }
  });
};

function initRandomDatas(pre) {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection("audios")
      .count()
      .then((res) => {
        // 随机一批 ID
        const ids = randomIds(pre, res.total);
        // console.log("randomIds", ids);
        const _ = db.command;
        db.collection("audios")
          .where({
            id: _.in(ids),
          })
          .get()
          .then((res) => {
            const dataList = [];

            // res data to key value map by id
            // https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object?rq=1
            const map = res.data.reduce(
              (map, it) => ((map[it.id] = it), map),
              {}
            );

            // 恢复 ids 顺序，由于 cloudbase 查询出的结果是排序的
            for (let i = 0; i < ids.length; i++) {
              dataList[i] = new Audio(map[ids[i]]);
            }

            // 赋值和初始化
            datas = dataList;
            console.log("ids map datas res.data", ids, map, datas, res.data);
            resolve(dataList);
          });
      });
  });
}

function nextData() {
  index++;
  return datas[index];
}

// 音频数据
function Audio(audioDB) {
  this.id = audioDB.id;
  this.zh = {
    path: audioDB.chinese.audio_path,
    text: audioDB.chinese.text,
    duration: audioDB.chinese.duration,
  };
  this.en = {
    path: audioDB.english.audio_path,
    text: audioDB.english.text,
    duration: audioDB.english.duration,
  };
}

// 在数据量比较小的情况下，确保不会出现重复的 ID
function randomIds(pre, total) {
  total = total - 1
  const res = [];

  // random 第一个
  res[0] = pre;
  while (res[0] == pre) {
    res[0] = randomNumber(0, total);
  }

  // random 剩余内容
  for (let i = 1; i < defaultLen; i++) {
    res[i] = randomNumber(0, total);
    while (res[i - 1] == res[i]) {
      res[i] = randomNumber(0, total);
    }
  }

  return res;
}

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { random };
