require 'rails_helper'

RSpec.describe CommonTimesFinder do

  let(:user) { create(:user) }
  let(:user_2) { create(:user) }
  let(:user_3) { create(:user) }
  let(:user_4) { create(:user) }
  let(:event) { create(:event, user: user) }
  let!(:event_availability_1) { 
    create(:event_availability, event: event, from: Time.zone.parse("10AM"), to: Time.zone.parse("11AM"), user: user) 
  }
  let!(:event_availability_2) { 
    create(:event_availability, event: event, from: Time.zone.parse("11AM"), to: Time.zone.parse("12PM"), user: user_2) 
  }
  let!(:event_availability_3) { 
    create(:event_availability, event: event, from: Time.zone.parse("12PM"), to: Time.zone.parse("1PM"), user: user_3) 
  }
  let!(:event_availability_4) { 
    create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("2PM"), user: user_4) 
  }
  let(:common_times_finder) { described_class.new(event: event) }

  describe "#call" do
    let(:subject) { common_times_finder.call }

    before do
      event.reload
    end

    context 'if there is no overlap' do
      it 'returns an empty array' do
        expect(subject).to eq({})    
      end
    end

    context 'if there is two users out of 4 with overlap' do
      let!(:event_availability_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("12PM"), user: user_2) 
      }

      it 'returns an empty array' do
        expect(subject).to eq(
          Time.zone.parse("10:30AM")..Time.zone.parse("11AM") => Set.new([user.id, user_2.id])
        )    
      end
    end

    context 'if there is three users out of 4 with overlap' do
      let!(:event_availability_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("12PM"), user: user_2) 
      }
      let!(:event_availability_3) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("2PM"), user: user_3) 
      }

      it 'returns an empty array' do
        expect(subject).to eq(
          Time.zone.parse("10:30AM")..Time.zone.parse("11AM") => Set.new([user.id, user_2.id, user_3.id]),
          Time.zone.parse("10:30AM")..Time.zone.parse("12PM") => Set.new([user_2.id, user_3.id]),
          Time.zone.parse("1PM")..Time.zone.parse("2PM") => Set.new([user_3.id, user_4.id])
        )    
      end
    end

    context 'if there is overlap for all users' do
      let!(:event_availability_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("12PM"), user: user_2) 
      }
      let!(:event_availability_3) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("1PM"), user: user_3) 
      }
      let!(:event_availability_4) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("2PM"), user: user_4) 
      }

      it 'returns common time' do
        expect(subject).to eq(
          Time.zone.parse("10:30AM")..Time.zone.parse("11AM") => Set.new([user.id, user_2.id, user_3.id, user_4.id]),
          Time.zone.parse("10:30AM")..Time.zone.parse("12PM") => Set.new([user_2.id, user_3.id, user_4.id]),
          Time.zone.parse("10:30AM")..Time.zone.parse("1PM") => Set.new([user_3.id, user_4.id])
        )    
      end
    end

    context 'if one user has large block but none of other users have commont time' do
      let!(:event_availability_1) { 
        create(:event_availability, event: event, from: Time.zone.parse("10AM"), to: Time.zone.parse("5PM"), user: user) 
      }

      it 'returns an empty array' do
        expect(subject).to eq(
          Time.zone.parse("11AM")..Time.zone.parse("12PM") => Set.new([user.id, user_2.id]),
          Time.zone.parse("12PM")..Time.zone.parse("1PM") => Set.new([user.id, user_3.id]),
          Time.zone.parse("1PM")..Time.zone.parse("2PM") => Set.new([user.id, user_4.id])
        )
      end

      context 'if there is overlap for all users' do
        let!(:event_availability_2) { 
          create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("12PM"), user: user_2) 
        }
        let!(:event_availability_3) { 
          create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("1PM"), user: user_3) 
        }
        let!(:event_availability_4) { 
          create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("2PM"), user: user_4) 
        }

        it 'returns common time' do
          expect(subject).to eq(
            Time.zone.parse("10:30AM")..Time.zone.parse("12PM") => Set.new([user.id, user_2.id, user_3.id, user_4.id]),
            Time.zone.parse("10:30AM")..Time.zone.parse("1PM") => Set.new([user.id, user_3.id, user_4.id]),
            Time.zone.parse("10:30AM")..Time.zone.parse("2PM") => Set.new([user.id, user_4.id])
          )    
        end
      end
    end

    context 'if one user has two availabilities and second availability overlaps with other users' do
      let!(:event_availability_1_1) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("2PM"), user: user) 
      }
      let!(:event_availability_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("2PM"), user: user_2) 
      }
      let!(:event_availability_3) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("3PM"), user: user_3) 
      }
      let!(:event_availability_4) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("4PM"), user: user_4) 
      }

      it 'returns common time' do
        expect(subject).to eq(
          Time.zone.parse("1PM")..Time.zone.parse("2PM") => Set.new([user.id, user_2.id, user_3.id, user_4.id]),
          Time.zone.parse("1PM")..Time.zone.parse("3PM") => Set.new([user_3.id, user_4.id]),
        )    
      end
    end

    context 'if there are multiple overlaps' do
      let!(:event_availability_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("12PM"), user: user_2) 
      }
      let!(:event_availability_3) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("1PM"), user: user_3) 
      }
      let!(:event_availability_4) { 
        create(:event_availability, event: event, from: Time.zone.parse("10:30AM"), to: Time.zone.parse("2PM"), user: user_4) 
      }
      let!(:event_availability_1_1) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("2PM"), user: user) 
      }
      let!(:event_availability_2_1) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("2PM"), user: user_2) 
      }
      let!(:event_availability_3_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("3PM"), user: user_3) 
      }
      let!(:event_availability_4_2) { 
        create(:event_availability, event: event, from: Time.zone.parse("1PM"), to: Time.zone.parse("4PM"), user: user_4) 
      }

      it 'returns common time' do
        expect(subject).to eq(
          Time.zone.parse("10:30AM")..Time.zone.parse("11AM") => Set.new([user.id, user_2.id, user_3.id, user_4.id]),
          Time.zone.parse("10:30AM")..Time.zone.parse("12PM") => Set.new([user_2.id, user_3.id, user_4.id]),
          Time.zone.parse("10:30AM")..Time.zone.parse("1PM") => Set.new([user_3.id, user_4.id]),
          Time.zone.parse("1PM")..Time.zone.parse("2PM") => Set.new([user.id, user_2.id, user_3.id, user_4.id]),
          Time.zone.parse("1PM")..Time.zone.parse("3PM") => Set.new([user_3.id, user_4.id]),
        )    

      end
    end
  end

end