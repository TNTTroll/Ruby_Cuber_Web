require "test_helper"

class BaseControllerTest < ActionDispatch::IntegrationTest
  test "should get board" do
    get base_board_url
    assert_response :success
  end
end
