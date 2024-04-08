<?php
$apiKey = 'myapikey'; // 実際のChannel TalkのAPIキーに置き換える

// PHPのinputストリームからJSONデータを受け取る
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$firstMessage = $data['firstMessage'];

// Channel Talkのユーザー情報更新APIエンドポイント
$url = 'https://api.channel.io/open/v5/users/upsert';

// cURLを使用してChannel Talk APIにリクエストを送信
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'X-Access-Token: ' . $apiKey
));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    'name' => $name,
    'email' => $email,
    'firstMessage' => $firstMessage
)));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
if (!$response) {
    die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
}

// レスポンスを確認
echo $response;

curl_close($ch);
