# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  email           :string
#  first_name      :string
#  last_name       :string
#  password_digest :string
#  phone_number    :string
#  temp            :boolean          default(FALSE)
#  timezone        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email         (email) UNIQUE
#  index_users_on_phone_number  (phone_number) UNIQUE
#  index_users_on_temp          (temp)
#
FactoryBot.define do
  factory :user do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    password { FFaker::Internet.password }
  end
end
