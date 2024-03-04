class CreateAuthentications < ActiveRecord::Migration[7.0]
  def change
    create_table :authentications, id: :uuid do |t|
      t.references :user, foreign_key: true, type: :uuid
      t.string :email, null: false
      t.string :uid, null: false
      t.string :provider, null: false

      t.timestamps
    end

    add_index :authentications, %i[email uid provider], unique: true
  end
end
