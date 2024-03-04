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
require 'rails_helper'

RSpec.describe EventAvailability, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
