defmodule Oli.Accounts.SystemRole do
  use Ecto.Schema
  import Ecto.Changeset

  @doc """
  Enumerates all the SystemRole ids
  """
  def role_id, do: %{
    user: 1,
    admin: 2,
  }

  schema "system_roles" do
    field :type, :string
    timestamps()
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:type])
    |> validate_required([:type])
  end
end
