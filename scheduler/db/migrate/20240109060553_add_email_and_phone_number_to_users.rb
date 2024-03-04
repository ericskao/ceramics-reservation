class AddEmailAndPhoneNumberToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :email, :string
    add_column :users, :phone_number, :string
    add_column :users, :temp, :boolean, default: false

    add_index :users, :email, unique: true
    add_index :users, :phone_number, unique: true
    add_index :users, :temp
  end
end
