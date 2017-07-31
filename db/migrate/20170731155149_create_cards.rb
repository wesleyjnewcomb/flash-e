class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.belongs_to :deck, null: false
      t.string :side1
      t.string :side2
      t.timestamps
    end
  end
end
