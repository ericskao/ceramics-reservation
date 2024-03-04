# == Schema Information
#
# Table name: events
#
#  id                 :uuid             not null, primary key
#  code               :string           not null
#  common_times       :jsonb            not null
#  common_times_votes :jsonb            not null
#  description        :string
#  expires_on         :date
#  state              :string           default("active")
#  title              :citext           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  user_id            :uuid             not null
#
# Indexes
#
#  index_events_on_code               (code) UNIQUE
#  index_events_on_title_and_user_id  (title,user_id) UNIQUE
#  index_events_on_user_id            (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :event do
    title { FFaker::Lorem.word }
    user
  end
end
