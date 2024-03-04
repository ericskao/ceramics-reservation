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
class Event < ApplicationRecord
  include AASM

  CODE_LENGTH = 6.freeze

  belongs_to :user
  has_many :event_availabilities, dependent: :destroy
  has_many :participants, -> { distinct }, through: :event_availabilities, source: :user

  validates :title, presence: true, uniqueness: { scope: :user_id }

  before_create :set_code

  scope :active, ->(user) { where('expires_on >= ?', Time.use_zone(user.timezone) { Time.zone.today }) }
  scope :closed, ->(user) { where('expires_on < ?', Time.use_zone(user.timezone) { Time.zone.today }) }

  accepts_nested_attributes_for :event_availabilities, reject_if: :all_blank, allow_destroy: true
  
  # aasm(column: 'state') do
  #   state :active, initial: true
  #   state :closed, :decided

  #   event :close do
  #     transitions from: :active, to: :closed
  #   end

  #   event :decide do
  #     transitions from: :active, to: :decided
  #   end

  #   event :reopen do
  #     transitions from: :closed, to: :active
  #   end
  # end

  def default_title
    "Event #{user.events.count + 1}"
  end

  def to_param
    code
  end

  def expired?(user)
    expires_on < Time.use_zone(user.timezone) { Time.zone.today } 
  end

  def status(user)
    expired?(user) ? 'Expired' : 'Active'
  end

  private 

  def set_code
    self.code = generated_code

    while Event.where(code: code).exists?
      self.code = generated_code
    end
  end

  def generated_code
    SecureRandom.alphanumeric(CODE_LENGTH).upcase
  end

end
