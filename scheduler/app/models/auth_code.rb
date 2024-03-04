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
class AuthCode < ApplicationRecord

  AUTH_CODE_LENGTH = 6.freeze

  belongs_to :user

  validates :code, presence: true, uniqueness: true

  before_validation :generate_code
  before_create :create_expires_at
  before_create :expire_all_active_codes

  scope :active, -> { where(verified_at: nil).where('expires_at > ?', Time.zone.now) }

  def active?
    verified_at.blank? && expires_at > Time.zone.now
  end

  private 

  def create_expires_at
    self.expires_at = Time.zone.now + 15.minutes
  end
  
  def expire_all_active_codes
    AuthCode.where(user: user).active.update_all(expires_at: Time.zone.now)
  end

  def generate_code
    self.code = SecureRandom.alphanumeric(AUTH_CODE_LENGTH).upcase

    while AuthCode.where(code: code).exists?
      self.code = SecureRandom.alphanumeric(AUTH_CODE_LENGTH).upcase
    end
  end

end
