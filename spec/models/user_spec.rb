
require 'rails_helper'

RSpec.describe User, type: :model do
  let(:email_user) { 'User123@mail.ru' }

  describe 'Manipulating with model ' do
    it 'create User and check valid' do
      user = ResultsForTimer.create(user: email_user, played: 1, solved: 1, speed: 1)
      expect(user).to be_valid
    end

    it 'create User and check invalid' do
      user = ResultsForTimer.create(user: email_user, played: 12, solved: 1, speed: 1)
      expect(user).to be_valid
    end

    it 'create new User and try to find it' do
      user = ResultsForTimer.create(user: email_user, played: 1, solved: 1, speed: 1)
      expect(ResultsForTimer.find_by(user: email_user)).to eq(user)
    end

    it 'create new User and try to find it by id' do
      user = ResultsForTimer.create(user: email_user, played: 1, solved: 1, speed: 1)
      expect(ResultsForTimer.find_by(id: user.id)).to eq(user)
    end

  end
end