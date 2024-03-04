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
require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
