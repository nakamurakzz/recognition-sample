# recognition-sample
recognition-sample

## AWS Rekognition SDK
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rekognition/index.html

## インストール
```
yarn
```

## 実行方法
### 共通
#### S3を使用する場合
- バケット作成、.envにWSのprofile名、バケット名を定義

#### 直接ファイルから読み込む場合
- .envにAWSのprofile名を定義

### Detect Labels
- detect-label フォルダをバケット直下に作成
- 以下を実行
```
yarn detect-labels 画像ファイル名
```

### Detect Text
- 以下を実行
```
yarn detect-text 画像ファイル名
```

ex.)
```
yarn detect-text sampleImages/nkmr_kz.png
┌─────────┬────────┬──────────────┬───────────────────┐
│ (index) │  Type  │ DetectedText │    Confidence     │
├─────────┼────────┼──────────────┼───────────────────┤
│    0    │ 'LINE' │    'nkmr'    │ 96.1604232788086  │
│    1    │ 'LINE' │     'kz'     │ 96.18953704833984 │
│    2    │ 'WORD' │    'nkmr'    │ 96.1604232788086  │
│    3    │ 'WORD' │     'kz'     │ 96.18953704833984 │
└─────────┴────────┴──────────────┴───────────────────┘
```

## Detect Face
- 以下を実行
```
yarn detect-face 画像ファイル名
```

レスポンスのEmotion属性の出力結果例
```
┌─────────┬─────────────┬─────────────────────┐
│ (index) │   Emotion   │     Confidence      │
├─────────┼─────────────┼─────────────────────┤
│    0    │ 'SURPRISED' │  99.60665130615234  │
│    1    │   'FEAR'    │  6.774599075317383  │
│    2    │    'SAD'    │  2.19338321685791   │
│    3    │ 'CONFUSED'  │ 0.6976492404937744  │
│    4    │   'CALM'    │ 0.5943138599395752  │
│    5    │ 'DISGUSTED' │ 0.22546781599521637 │
│    6    │   'HAPPY'   │ 0.2077484428882599  │
│    7    │   'ANGRY'   │ 0.19574607908725739 │
└─────────┴─────────────┴─────────────────────┘
```