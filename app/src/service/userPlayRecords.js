
const savePlayRecord = (audio) => {
    if(audio) {
        const db = wx.cloud.database()
        console.log(db)
        db.collection("user_play_records")
            .add({data:{audio_id: audio.id, create_time: new Date()}})
    }
}

const countPlayRecord = (audio) => {
    const db = wx.cloud.database()
    return db.collection("user_play_records").where({
        audio_id: audio?.id
    })
    .count()
}

export {
    savePlayRecord,
    countPlayRecord
}

