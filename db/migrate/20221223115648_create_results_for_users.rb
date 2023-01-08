class CreateResultsForUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :results_for_users do |t|
      t.string :user, null: false
      t.integer :time, null: false

      t.timestamps
    end
  end
end
