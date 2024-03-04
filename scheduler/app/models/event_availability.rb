# == Schema Information
#
# Table name: event_availabilities
#
#  id         :bigint           not null, primary key
#  from       :datetime         not null
#  to         :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  event_id   :uuid             not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_event_availabilities_on_event_id  (event_id)
#  index_event_availabilities_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (user_id => users.id)
#
class EventAvailability < ApplicationRecord
  belongs_to :event
  belongs_to :user

  validates :from, :to, presence: true
  validates_datetime :to, on_or_after: :from, on_or_after_message: 'must be after from time'
  validates_datetime :from, on: :create, on_or_after: Time.zone.now, on_or_after_message: 'must be after now'
  validate :no_duplicate

  def date
    from&.to_date
  end

  def to_range
    from..to
  end

  private 

  def no_duplicate
    if event.event_availabilities.where(from: from, to: to, user: user).exists?
      errors.add(:base, 'duplicate availability exists')
    end
  end
end
