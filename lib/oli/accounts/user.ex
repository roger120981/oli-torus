defmodule Oli.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :provider, :string
    field :token, :string
    # virtual fields are NOT persisted to the database
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    field :password_hash, :string
    field :email_verified, :boolean, default: false
    has_many :institutions, Oli.Accounts.Institution
    many_to_many :projects, Oli.Authoring.Project, join_through: Oli.Accounts.UserProject
    many_to_many :sections, Oli.Delivery.Section, join_through: Oli.Accounts.UserSection
    timestamps()
    belongs_to :system_role, Oli.Accounts.SystemRole
  end

  @doc false
  def changeset(user, attrs \\ %{}) do
    user
    |> cast(attrs, [
      :email,
      :first_name,
      :last_name,
      :provider,
      :token,
      :password,
      :email_verified,
      :system_role_id
    ])
    |> validate_required([:email, :first_name, :last_name, :provider, :system_role_id])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, message: "does not match password")
    |> lowercase_email()
    |> hash_password()
  end

  defp hash_password(changeset) do
    case changeset do
      # if changeset is valid and has a password, we want to convert it to a hash
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Bcrypt.hash_pwd_salt(pass))

      _ ->
        changeset
    end
  end

  defp lowercase_email(changeset) do
    update_change(changeset, :email, &String.downcase/1)
  end
end
