import Taro from "@tarojs/taro";


const saveRecord = (audio) => {
    if(audio != null) {
        const auth = Taro.cloud.auth();
        const user = auth.currentUser;
        if(user != null) {
            const db = Taro.cloud.database()
            db.collection("books")
                .add(new Record(user.uid, audio.id))
                .then((res) => {
                    console.log(res);
                });
        }
    }
}

//  播放记录对象
function Record(uid, audio_id) {
    this.uid = uid;
    this.audio_id = audio_id;
    this.create_time = new Date();
}


export {
    saveRecord
}

