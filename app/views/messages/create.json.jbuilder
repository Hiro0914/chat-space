json.group_id @message.group_id
json.content @message.content
json.image @message.image
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")

# チャット画面に表示する内容