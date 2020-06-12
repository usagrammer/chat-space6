## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name |string|null: false, index: true, unique: true|
|email|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user |references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|string    |null: false|
|image  |string    |null: false|
|user   |references|null: false, foreign_key: true|
|group  |references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
