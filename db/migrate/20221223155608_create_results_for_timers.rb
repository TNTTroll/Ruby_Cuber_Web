class CreateResultsForTimers < ActiveRecord::Migration[7.0]
  def change
    create_table :results_for_timers do |t|
      t.string :user, null: false
      t.integer :speed, null: false
      t.integer :solved, null: false
      t.integer :played, null: false

      t.timestamps
    end
  end
end
