class CommonTimesFinder

  def initialize(event:)
    @event = event
    @common_times = {}
  end

  def call
    find_all_common_times

    # Sort by intersection with the most users first
    @common_times.sort_by { |k, v| -v.length }.to_h
  end

  private

  def find_all_common_times
    availabilities_by_user.values.each do |appointment_availabilities|
      appointment_availabilities.each do |appointment_availability|
        find_common_time(appointment_availability)
      end
    end
  end

  def availabilities_by_user
    @availabilities_by_user ||= @event.event_availabilities.group_by(&:user_id)
  end

  def other_availabilities(user_id)
    availabilities_by_user.except(user_id)
  end

  def find_common_time(appointment_availability)
    other_availabilities(appointment_availability.user_id).values.each do |availabilities|
      availabilities.each do |availability|
        intersection = appointment_availability.to_range.intersection(availability.to_range)
        next if intersection.blank? || intersection.first == intersection.last

        @common_times[intersection] ||= Set.new([appointment_availability.user_id])
        @common_times[intersection] << availability.user_id
      end
    end
  end

end