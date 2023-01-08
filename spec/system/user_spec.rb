require 'capybara/rspec'
require 'spec_helper'
require 'rails_helper'

RSpec.describe Devise, type: :system do
  let(:email_user) { 'User34@mail.ru' }
  let(:password_user) { 'rijqjr;3rewmnrwea' }

  describe 'User sign up' do
    it 'sign up without params' do
      visit root_path
      click_button 'SIGN UP'
      fill_in 'Email', with: email_user
      click_button 'Sign up'
      expect(page).to have_content("1 error prohibited this user from being")
    end

    it 'sign up with params' do
      visit new_user_registration_path
      fill_in 'Email', with: email_user, wait: 10
      fill_in 'Password', with: password_user, wait: 10
      fill_in 'Password', with: password_user
      click_button 'Sign up'
      expect(page).to have_content("Welcome, User34@mail.ru")
    end
  end

  describe 'User Sign In' do
    it 'sign in' do
      visit root_path
      click_button 'LOG IN'
      expect(page).to have_content("Back")
    end

    it 'sign in with params' do
      visit root_path
      click_button 'LOG IN'
      fill_in 'email-input', with: email_user, wait: 10
      fill_in 'password-input', with: password_user, wait: 10
      click_button 'Log in'
      expect(page).to have_content("Welcome, User34@mail.ru")
    end
  end

end