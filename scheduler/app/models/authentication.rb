# == Schema Information
#
# Table name: authentications
#
#  id         :uuid             not null, primary key
#  email      :string           not null
#  provider   :string           not null
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid
#
# Indexes
#
#  index_authentications_on_email_and_uid_and_provider  (email,uid,provider) UNIQUE
#  index_authentications_on_user_id                     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Authentication < ApplicationRecord  
  belongs_to :user, optional: true
end
