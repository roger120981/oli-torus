defmodule Oli.Registrar do

  alias Oli.Activities
  alias Oli.Activities.Manifest

  def register_local_activities() do
    Application.fetch_env!(:oli, :local_activity_manifests)
      |> Enum.map(fn body ->
        case Jason.decode(body) do
          {:ok, json} -> json
        end
      end)
      |> Enum.map(&Manifest.parse/1)
      |> Enum.map(fn m -> Activities.register_activity(m) end)
  end

end
