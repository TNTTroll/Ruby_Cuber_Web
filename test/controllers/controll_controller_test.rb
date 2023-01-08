require "test_helper"

class ControllControllerTest < ActionDispatch::IntegrationTest
  test "should get page" do
    get controll_page_url
    assert_response :success
  end
end
