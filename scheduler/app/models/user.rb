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
class User < ApplicationRecord
  has_secure_password

  DEFAULT_TIMEZONE = 'America/Los_Angeles'.freeze

  has_many :events, dependent: :destroy
  has_many :auth_codes, dependent: :destroy
  has_many :event_availabilities, dependent: :destroy
  has_many :participating_events, -> { distinct }, through: :event_availabilities, source: :event
  has_many :authentications, dependent: :destroy

  validates :phone_number, phone: true, allow_blank: true
  
  before_validation :set_timezone

  def other_participating_events
    participating_events.where.not(id: events.pluck(:id))
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def set_timezone
    self.timezone = DEFAULT_TIMEZONE if timezone.blank?
  end
end
