class SendSms

  def initialize(to:, message: nil)
    @to = to
    @message = message || 'Please use the code to verify your account.'
  end

  def call
    client.messages.create(
      body: @message,
      to: @to,
      from: ENV['TWILIO_FROM']
    )
  end

  private

  def client
    @client ||= Twilio::REST::Client.new(ENV['TWILIO_SID'], ENV['TWILIO_TOKEN'])
  end

end
