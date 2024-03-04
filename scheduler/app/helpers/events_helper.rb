module EventsHelper
  def create_cal_links(from:, to:, event:)
    AddToCalendar::URLs.new(
      start_datetime: Time.zone.parse(from), 
      end_datetime: Time.zone.parse(to), 
      title: event.title,
      timezone: 'America/Los_Angeles'
    )
  end

  def time_string_no_date(time)
    time.strftime('%l:%M%p')
  end

  def time_string(time)
    time.strftime('%l:%M%p %Z on %F')
  end
end