import Taro from "@tarojs/taro";

const savePlayRecord = (audio) => {
    if(audio) {
        const db = Taro.cloud.database();
        console.log(db)
        db.collection("user_play_records")
            .add({data:{audio_id: audio.id, create_time: new Date()}})
    }
}

const countPlayRecord = (audio) => {
    const db = Taro.cloud.database();
    return new Promise((resolve, reject) => {
        db.collection("user_play_records").where({
            audio_id: audio?.id
        }).count().then(res => {
            resolve(res.total)
        })
    })
}

export {
    savePlayRecord,
    countPlayRecord
}

