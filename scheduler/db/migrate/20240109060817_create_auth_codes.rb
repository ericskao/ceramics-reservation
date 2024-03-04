class CreateAuthCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :auth_codes do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :code, null: false
      t.datetime :expires_at
      t.datetime :verified_at

      t.timestamps
    end

    add_index :auth_codes, :code, unique: true
    add_index :auth_codes, :expires_at
    add_index :auth_codes, :verified_at
  end
end
