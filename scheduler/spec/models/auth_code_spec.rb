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
require 'rails_helper'

RSpec.describe AuthCode, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
