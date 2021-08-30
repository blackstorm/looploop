module.exports = {
  getLastAudio: async (manager) => {
    /**
     * {
        EnvId: 'default-5gswefsf8440cf4a',
        Source: 'miniapp',
        Alias: 'looploop',
        CreateTime: '2021-07-26 01:57:00',
        UpdateTime: '2021-08-23 16:22:43',
        Status: 'NORMAL',
        Databases: [
          {
            InstanceId: 'tnt-96i7cz5fa',
            Status: 'RUNNING',
            Region: 'ap-shanghai'
          }
        ],
        Storages: [
          {
            Region: 'ap-shanghai',
            Bucket: '6465-default-5gswefsf8440cf4a-1306659255',
            CdnDomain: '6465-default-5gswefsf8440cf4a-1306659255.tcb.qcloud.la',
            AppId: '1306659255'
          }
        ],
        Functions: [ { Namespace: 'default-5gswefsf8440cf4a', Region: 'ap-shanghai' } ],
        PackageId: 'specialbasic1',
        PackageName: '特惠基础版 1',
        LogServices: [
          {
            LogsetName: 'tcb-logset-default-5gswefsf8440cf4a',
            LogsetId: '4e8c9cd0-ab90-4982-8e0a-a166ae3590c4',
            TopicName: 'tcb-topic-default-5gswefsf8440cf4a',
            TopicId: '4697c781-f3fe-4880-8e6f-c1c63f626e76',
            Region: 'ap-nanjing-tcb'
          }
        ],
        StaticStorages: [],
        IsAutoDegrade: false,
        EnvChannel: 'ide',
        PayMode: 'prepayment',
        IsDefault: true,
        Region: 'ap-shanghai',
        Tags: [],
        CustomLogServices: []
      }
     */
    const { EnvInfo } = await manager.env.getEnvInfo();
    const result = await manager.commonService("flexdb").call({
      Action: "Query",
      Param: {
        TableName: "audios",
        Tag: EnvInfo.Databases[0].InstanceId,
        MgoLimit: 1,
        MgoSort: JSON.stringify({ id: 1 }),
      },
    });
    return result;
  },
};
