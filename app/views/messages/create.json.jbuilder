# json.(@message, :content, :image)
#src属性にurl情報が反映されてなかったので@message.image.urlを追記
json.content @message.content
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id

# チャット画面に表示する内容