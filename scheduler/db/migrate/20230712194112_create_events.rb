class CreateEvents < ActiveRecord::Migration[7.0]
  enable_extension("citext")                   

  def change
    create_table :events, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.citext :title, null: false
      t.string :code, null: false
      t.string :state, default: 'active'
      t.date :expires_on
      t.jsonb :common_times, null: false, default: {}
      t.jsonb :common_times_votes, null: false, default: {}

      t.timestamps
    end

    add_index :events, %i[title user_id], unique: true
    add_index :events, :code, unique: true
  end
end
