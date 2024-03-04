class CreateEventAvailabilities < ActiveRecord::Migration[7.0]
  def change
    create_table :event_availabilities do |t|
      t.references :event, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.datetime :from, null: false
      t.datetime :to, null: false

      t.timestamps
    end
  end
end
