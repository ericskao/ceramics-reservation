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
class EventAvailabilitySerializer
  include JSONAPI::Serializer
  belongs_to :event
  belongs_to :user

  attributes :from, :to
end
