import Taro from "@tarojs/taro";

// 音频 被播放次数、最近一次听的人
const audioStatisticsCount = (audioId) => {
    const db = Taro.cloud.database();
    return new Promise((resolver, reject) => {
        db.collection("record").where({
            audio_id: audioId
        }).count().then(res => {
            if(res.total > 0) {
                db.collection("record").where({
                    audio_id: audioId
                }).aggregate()
                .sort({create_time: 1})
                .limit(1)
                .end().then(res => {
                    let record = res.data;
                    
                })
            
            } else {
                resolver({total: 0, lastLoopUser: null})
            }
        })
    })
}


// 播放时长 排名
const durationRank = (limit) => {
    if(limit < 1) {
        return [];
    }
    const db = Taro.cloud.database();
    db.collection("record")
}

// 用户播放时长
const durationOfUser = (uid) => {
    const db = Taro.cloud.database();
    const _ = db.command;
    const $ = db.command.aggregate;
    return db.collection("record").where({
        uid: uid
    }).aggregate().group({
        _id: null,
        totalPrice: $.sum('$d')
      })
}

export {
    audioStatisticsCount,
    durationRank,
    durationOfUser
}


