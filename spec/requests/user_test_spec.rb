require "json"
require "selenium-webdriver"
require "rspec"
include RSpec::Expectations

describe "UntitledTestCase" do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
    @base_url = "https://www.google.com/"
    @accept_next_alert = true
    @driver.manage.timeouts.implicit_wait = 30
    @verification_errors = []
  end

  after(:each) do
    @driver.quit
    @verification_errors.should == []
  end

  it "invalid_signup" do
    @driver.get "http://127.0.0.1:3000/?"
    @driver.find_element(:xpath, "//button[@type='submit']").click
    @driver.find_element(:id, "user_email").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User21@mail.ru"
    @driver.find_element(:id, "user_password").click
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "123456"
    @driver.find_element(:id, "user_password_confirmation").click
    @driver.find_element(:id, "user_password_confirmation").clear
    @driver.find_element(:id, "user_password_confirmation").send_keys "123455"
    @driver.find_element(:xpath, "//*/text()[normalize-space(.)='']/parent::*").click
    @driver.find_element(:name, "commit").click
    @driver.find_element(:xpath, "//div[@id='error_explanation']/h2").click
  end

  it "valid_signup" do
    @driver.get "http://127.0.0.1:3000/?"
    @driver.find_element(:xpath, "//button[@type='submit']").click
    @driver.find_element(:id, "user_email").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User22@mail.ru"
    @driver.find_element(:id, "user_password").click
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "123456"
    @driver.find_element(:id, "user_password_confirmation").click
    @driver.find_element(:id, "user_password_confirmation").clear
    @driver.find_element(:id, "user_password_confirmation").send_keys "123456"
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='(6 characters minimum)'])[1]/following::div[1]").click
    @driver.find_element(:name, "commit").click
  end

  it "invalid_login" do
    @driver.get "http://127.0.0.1:3000/"
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='SIGN UP'])[1]/following::button[1]").click
    @driver.find_element(:id, "user_email").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User22@mail.ru"
    @driver.find_element(:id, "user_password").click
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "1234567"
    @driver.find_element(:name, "commit").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='Email'])[1]/preceding::p[1]").click
  end

  it "valid_login" do
    @driver.get "http://127.0.0.1:3000/"
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='SIGN UP'])[1]/following::button[1]").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User22@mail.ru"
    @driver.find_element(:id, "user_password").click
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "123456"
    @driver.find_element(:name, "commit").click
  end

  it "start_game" do
    @driver.get "http://127.0.0.1:3000/"
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='SIGN UP'])[1]/following::button[1]").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User23@mail.ru"
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "123456"
    @driver.find_element(:name, "commit").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='Statistics'])[1]/following::button[1]").click
    @driver.find_element(:xpath, "//button[@onclick='start_practice()']").click
  end

  it "cube_moves" do
    @driver.get "http://127.0.0.1:3000/"
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='SIGN UP'])[1]/following::button[1]").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User23@mail.ru"
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "123456"
    @driver.find_element(:name, "commit").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='Statistics'])[1]/following::button[1]").click
    @driver.find_element(:xpath, "//button[@onclick='start_practice()']").click
    @driver.find_element(:xpath, "//button[@onclick='turn_button(2, 1)']").click
    @driver.find_element(:xpath, "//button[@onclick='turn_button(2, -1)']").click
    @driver.find_element(:xpath, "//button[@onclick='turn_button(0, 1)']").click
    @driver.find_element(:xpath, "//button[@onclick='turn_button(0, -1)']").click
  end

  it "test_logout" do
    @driver.get "http://127.0.0.1:3000/"
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='SIGN UP'])[1]/following::td[1]").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='SIGN UP'])[1]/following::button[1]").click
    @driver.find_element(:id, "user_email").clear
    @driver.find_element(:id, "user_email").send_keys "User23@mail.ru"
    @driver.find_element(:id, "user_password").clear
    @driver.find_element(:id, "user_password").send_keys "123456"
    @driver.find_element(:name, "commit").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='Log Out'])[1]/following::p[1]").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='Play'])[1]/following::button[1]").click
    @driver.find_element(:xpath, "(.//*[normalize-space(text()) and normalize-space(.)='LOG IN'])[1]/following::p[1]").click
  end

  def element_present?(how, what)
    @driver.find_element(how, what)
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  def alert_present?()
    @driver.switch_to.alert
    true
  rescue Selenium::WebDriver::Error::NoAlertPresentError
    false
  end

  def verify(&blk)
    yield
  rescue ExpectationNotMetError => ex
    @verification_errors << ex
  end

  def close_alert_and_get_its_text(how, what)
    alert = @driver.switch_to().alert()
    alert_text = alert.text
    if (@accept_next_alert) then
      alert.accept()
    else
      alert.dismiss()
    end
    alert_text
  ensure
    @accept_next_alert = true
  end
end
