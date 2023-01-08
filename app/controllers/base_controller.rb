class BaseController < ApplicationController
  def board
    person = ResultsForTimer.find_by_user(current_user.email)
    time = request.params[:time]
    solved = request.params[:solved]

    if person.nil?
      ResultsForTimer.create!(user: current_user.email, played: 1, solved: solved.to_i, speed: time )
    else
      if (solved === '1')
        ResultsForTimer.create!(user: current_user.email, played: person.played+1, solved: person.solved+1, speed: time )
      else
        ResultsForTimer.create!(user: current_user.email, played: person.played+1, solved: person.solved, speed: time )
      end
    end
  end
end
