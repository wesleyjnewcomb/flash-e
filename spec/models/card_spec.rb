require 'rails_helper'

RSpec.describe Card, type: :model do
  it { should validate_presence_of :deck }
end
