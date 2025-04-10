defmodule Oli.Plugs.RestrictAdminAccess do
  use OliWeb, :verified_routes

  import Plug.Conn
  import Phoenix.Controller

  def init(opts), do: opts

  def call(conn, _opts) do
    if Oli.Accounts.is_admin?(conn.assigns[:current_author]) do
      conn
      |> redirect(to: ~p"/workspaces/course_author")
      |> halt()
    else
      conn
    end
  end
end
