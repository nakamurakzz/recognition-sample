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
- バケット作成、.envに定義

### DetectLabels
- detect-label フォルダをバケット直下に作成
- 以下を実行
```
yarn detect-labels 画像ファイル名
```

### DetectText
- detect-text フォルダをバケット直下に作成
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
