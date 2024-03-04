# == Schema Information
#
# Table name: auth_codes
#
#  id          :bigint           not null, primary key
#  code        :string           not null
#  expires_at  :datetime
#  verified_at :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :uuid             not null
#
# Indexes
#
#  index_auth_codes_on_code         (code) UNIQUE
#  index_auth_codes_on_expires_at   (expires_at)
#  index_auth_codes_on_user_id      (user_id)
#  index_auth_codes_on_verified_at  (verified_at)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :auth_code do
    user { nil }
    code { "MyString" }
    expires_at { "2024-01-08 22:08:17" }
    verified_at { "2024-01-08 22:08:17" }
  end
end
