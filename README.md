# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## messages table

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user|references|null: false, foreign_key: true| 
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## members table

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
