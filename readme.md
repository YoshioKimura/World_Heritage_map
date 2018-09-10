# 何のサービスか

日本にある世界遺産を場所と動画で学べるサービス

# 使い方

「地図に世界遺産を表示」をクリックすると、jsonファイルから取得した世界遺産の名前を位置情報に変換し、マップ上にすべてプロットします。
プロットされたマーカーをクリックすると、補足説明のための情報ウィンドウが表示され、関連動画が右側に表示されて動画を楽しめます。

# APIキーの部分について

今回は２つのAPIを利用しています。

Geocoding API( 文字情報を受け取って緯度経度にして返してくれるAPI )
https://console.cloud.google.com/google/maps-apis/apis/geocoding-backend.googleapis.com/metrics

Maps JavaScript API (ブラウザ上に地図を表示させるAPI )
https://console.cloud.google.com/google/maps-apis/apis/maps-backend.googleapis.com/metrics

google maps API(地図の表示)と、geocoding API(文字列→緯度経度への変換)を有効にする必要があります。
有効にしないとコンソールにエラーメッセージが表示されます。

geocoding APIは一日の利用制限があるため、タイミングによってはすべての変換が出来ない場合があります。
(Geocode was not successful for the following reason: OVER_QUERY_LIMITというエラーが表示)

# その他

file:///Users/*****/ 〜のようにファイルをそのまま開くとエラーが起きます。
サーバーからでないと表示出来ません。(localhost/***や 127.0.0.1/ など)

サーバーから表示させる方法にはいくつか候補がありますが、今回は①のbracketsのライブプレビュー機能を使いました。

・brackets ( http://brackets.io/  ) のライブプレビュー機能を使う
・ブラウザ上に仮想的なサーバーを作るchromeの拡張機能をインストールする
・XAMPPやMAMPなどのサーバーを作れるツールをインストールし、環境を設定する
