
const record = ({ audio, lang }) => {
    if (audio) {
        const db = wx.cloud.database();
        db.collection("user_play_records")
            .add({ data: { audio_id: audio.id, lang: lang, create_time: new Date() } })
    }
}

const statistics = () => {
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
        const a = db.collection("user_play_records").get().then(res => {
            // 查询记录
            const _ = db.command;
            const audioIds = res.data.map(it => it.audio_id);
            db.collection("audios").where({
                id: _.in(audioIds)
            }).get().then(res2 => {
                // 统计时长
                const result = res2.data.reduce((r, it) => {
                    r[it.id] = it;
                    return r;
                }, {});
                console.log(result)
                let totalDuration = 0;
                res.data.forEach(element => {
                    console.log(element)
                    if (element.lang === 'zh') {
                        totalDuration += result[element.audio_id].chinese.duration;
                    } else {
                        totalDuration += result[element.audio_id].english.duration;
                    }
                });
                resolve({ counts: audioIds.length, duration: totalDuration })
            })
        })
    })
}

export {
    record,
    statistics
}

