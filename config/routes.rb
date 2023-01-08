Rails.application.routes.draw do
  devise_for :users

  get 'static_pages/landing_page'
  get 'controll/page'
  get 'controll/pop_up'
  get 'controll/skin'
  get 'controll/application'
  get 'base/board'

  root 'static_pages#landing_page'

end
