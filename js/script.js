    var geocoder;
    var map;
    var isanArray;

    //jsonフォルダ下にあるisan.jsonを取得してisanArray配列に格納
    $.getJSON( "json/isan.json", function( data ) {
            console.log(data[3].name);
            isanArray = data;
            console.log(isanArray.length);
    });

    //マーカーを置く関数を宣言
    function setMarker() {
//        データの個数だけ繰り返す処理
        for(let i = 0; i < isanArray.length;i++){
            //--------------繰り返しここから------------------------
            //文字列を位置情報の変換(今回はisanArray[i].name)
            geocoder.geocode( { 'address': isanArray[i].name}, function(results, status) {
                //もしステータスコードがOKなら
              if (status == 'OK') {
                  //mapの中央を返ってきた結果の位置情報にする
                    map.setCenter(results[0].geometry.location);
                    //マーカーを表示させるための処理(Markerメソッドの引数にオブジェクトを入れ、プロパティにはmapオブジェクトと位置情報(position)を入れる)
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    //情報ウィンドウに表示させる内容。jsonから取ってきたname,categoly,introductionを入れる
                    var contentString =`<div id="content">
                                        <h1>${isanArray[i].name}</h1>
                                        <div>
                                        <h3>${isanArray[i].categoly}</h3>
                                        <p>${isanArray[i].introduction}</p>
                                        </div>
                                        </div>`;
                    //情報ウィンドウを表示させる設定
                    var infowindow = new google.maps.InfoWindow({
                      content: contentString,
                      maxWidth: 250
                    });
                  //マーカーをクリックした時のイベントを設定
                    marker.addListener('click', function() {
                        //情報ウィンドウを開く
                      infowindow.open(map, marker);
                        //data-num(youtubeを囲っているdivにつけている属性)がi+1番のもののdisplay:noneを解除
                      $(`[ data-num = ${i+1} ]`).css('display','block');
                        //data-numがi+1番のもの以外を非表示にする
                      $(`[ data-num = ${i+1} ]`).siblings().css('display','none');
                    });
                   //もしステータスコードがOK以外なら
                } else {
                    //コンソールに理由を表示
                  console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
            //--------------繰り返しここまで------------------------
        }
    }

    
    //1．位置情報の取得に成功した時の処理
    function mapsInit(position) {
        //lat=緯度、lon=経度 を取得
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        //div#mapを「GoogleMap」化
        map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: lat, lng: lon}, //緯度,経度を設定
           zoom: 5 //Zoom値設定
        });

        document.getElementById('submit').addEventListener('click', setMarker );
    };

    //2． 位置情報の取得に失敗した場合の処理
    function mapsError(error) {
          let e = "";
          if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
            e = "位置情報が許可されてません";
          }
          if (error.code == 2) { //2＝現在地を特定できない
            e = "現在位置を特定できません";
          }
          if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
            e = "位置情報を取得する前にタイムアウトになりました";
          }
        //  alert("エラー：" + e);
    };

    //3.位置情報取得オプション
    const set ={
          enableHighAccuracy: true, //より高精度な位置を求める
          maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
          timeout: 20000             //10秒以内に現在地情報を取得できなければ、処理を終了
    };

    //Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
    function initMap(){
          navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
    }