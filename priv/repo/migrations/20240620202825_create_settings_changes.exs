defmodule Oli.Repo.Migrations.CreateSettingsChanges do
  use Ecto.Migration

  def change do
    create table(:settings_changes) do
      add :resource_id, references(:resources)
      add :section_id, references(:sections)
      add :user_id, references(:users)
      add :key, :string
      add :new_value, :string
      add :old_value, :string

      timestamps()
    end
  end
end
