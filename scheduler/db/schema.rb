# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_01_09_060817) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "auth_codes", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "code", null: false
    t.datetime "expires_at"
    t.datetime "verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_auth_codes_on_code", unique: true
    t.index ["expires_at"], name: "index_auth_codes_on_expires_at"
    t.index ["user_id"], name: "index_auth_codes_on_user_id"
    t.index ["verified_at"], name: "index_auth_codes_on_verified_at"
  end

  create_table "authentications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "email", null: false
    t.string "uid", null: false
    t.string "provider", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "uid", "provider"], name: "index_authentications_on_email_and_uid_and_provider", unique: true
    t.index ["user_id"], name: "index_authentications_on_user_id"
  end

  create_table "event_availabilities", force: :cascade do |t|
    t.uuid "event_id", null: false
    t.uuid "user_id", null: false
    t.datetime "from", null: false
    t.datetime "to", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_availabilities_on_event_id"
    t.index ["user_id"], name: "index_event_availabilities_on_user_id"
  end

  create_table "events", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.citext "title", null: false
    t.string "code", null: false
    t.string "state", default: "active"
    t.date "expires_on"
    t.jsonb "common_times", default: {}, null: false
    t.jsonb "common_times_votes", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.index ["code"], name: "index_events_on_code", unique: true
    t.index ["title", "user_id"], name: "index_events_on_title_and_user_id", unique: true
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "timezone", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "phone_number"
    t.boolean "temp", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["temp"], name: "index_users_on_temp"
  end

  add_foreign_key "auth_codes", "users"
  add_foreign_key "authentications", "users"
  add_foreign_key "event_availabilities", "events"
  add_foreign_key "event_availabilities", "users"
  add_foreign_key "events", "users"
end
