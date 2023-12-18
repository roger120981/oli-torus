defmodule OliWeb.Delivery.Student.ScheduleLive do
  use OliWeb, :live_view

  alias OliWeb.Common.SessionContext
  alias Oli.Delivery.Sections
  alias OliWeb.Components.Delivery.Schedule

  def mount(_params, _session, socket) do
    section = socket.assigns[:section]

    schedule = Sections.get_ordered_schedule(section)

    {:ok,
     assign(socket,
       active_tab: :schedule,
       schedule: schedule
     )}
  end

  def render(assigns) do
    ~H"""
    <.hero_banner class="bg-schedule">
      <h1 class="text-6xl mb-8">Course Schedule</h1>
    </.hero_banner>

    <div class="container mx-auto">
      <.schedule ctx={@ctx} schedule={@schedule} />
    </div>
    """
  end

  attr :ctx, SessionContext, required: true
  attr :schedule, :any, required: true

  def schedule(assigns) do
    ~H"""
    <div class="my-8 px-16">
      <div class="mb-8">
        Scroll though your course schedule to find all critical due dates and when assignments are due. Use this schedule view to see which activities you've completed throughout your time in the course.
      </div>

      <div class="flex flex-col">
        <%= for {{month, _year}, weekly_schedule} <- @schedule do %>
          <div class="flex flex-row">
            <div class="w-32 uppercase font-bold text-gray-500"><%= month_name(month) %></div>

            <div class="flex-1 flex flex-col">
              <%= for {week, schedule_ranges} <- weekly_schedule do %>
                <div class="flex flex-row border-l border-gray-300 dark:border-gray-700 px-4">
                  <Schedule.week ctx={@ctx} week_number={week} schedule_ranges={schedule_ranges} />
                </div>
              <% end %>
            </div>
          </div>
        <% end %>
      </div>
    </div>
    """
  end

  defp month_name(nil), do: ""

  defp month_name(month) do
    Timex.month_name(month)
  end
end
