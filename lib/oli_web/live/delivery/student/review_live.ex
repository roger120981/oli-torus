defmodule OliWeb.Delivery.Student.ReviewLive do
  use OliWeb, :live_view

  on_mount {OliWeb.LiveSessionPlugs.InitPage, :page_context}
  on_mount {OliWeb.LiveSessionPlugs.InitPage, :previous_next_index}

  import OliWeb.Delivery.Student.Utils,
    only: [page_header: 1, scripts: 1]

  alias Oli.Delivery.Attempts.PageLifecycle
  alias Oli.Delivery.Page.PageContext
  alias Oli.Publishing.DeliveryResolver, as: Resolver
  alias OliWeb.Delivery.Student.Utils

  def mount(
        %{
          "revision_slug" => revision_slug,
          "attempt_guid" => attempt_guid
        },
        _session,
        %{assigns: %{current_user: user, section: section}} = socket
      ) do
    page_revision = Resolver.from_revision_slug(section.slug, revision_slug)

    page_context = PageContext.create_for_review(section.slug, attempt_guid, user, false)

    socket =
      if PageLifecycle.can_access_attempt?(attempt_guid, user, section) and
           review_allowed?(page_context) do
        socket
        |> assign(page_context: page_context)
        |> assign(page_revision: page_revision)
        |> assign_html_and_scripts()
      else
        socket
        |> put_flash(:error, "You are not allowed to review this attempt.")
        |> redirect(to: ~p"/sections/#{section.slug}/learn")
      end

    {:ok, socket}
  end

  defp review_allowed?(page_context),
    do: page_context.effective_settings.review_submission == :allow

  def render(assigns) do
    ~H"""
    <div class="flex pb-20 flex-col items-center gap-15 flex-1">
      <div class="flex flex-col items-center w-full">
        <div class="w-full h-[120px] lg:px-20 px-40 py-9 bg-blue-600 bg-opacity-10 flex flex-col justify-center items-center gap-2.5">
          <div class="px-3 py-1.5 rounded justify-start items-start gap-2.5 flex">
            <div class="dark:text-white text-sm font-bold uppercase tracking-wider">
              Review
            </div>
          </div>
        </div>
        <div class="w-[720px] pt-20 pb-10 flex-col justify-start items-center gap-10 inline-flex">
          <.page_header
            page_context={@page_context}
            ctx={@ctx}
            index={@current_page["index"]}
            container_label={Utils.get_container_label(@current_page["id"], @section)}
          />
          <div id="eventIntercept" phx-update="ignore" class="content" role="page_content">
            <%= raw(@html) %>
          </div>
          <.link href={~p"/sections/#{@section.slug}/lesson/#{@page_revision.slug}"}>
            <div class="h-10 px-5 py-2.5 hover:bg-opacity-40 bg-blue-600 rounded shadow justify-center items-center gap-2.5 inline-flex">
              <div class="text-white text-sm font-normal leading-tight">
                Back to Summary Screen
              </div>
            </div>
          </.link>
        </div>
      </div>
    </div>

    <.scripts scripts={@scripts} user_token={@user_token} />
    """
  end

  defp assign_html_and_scripts(socket) do
    socket
    |> assign(html: Utils.build_html(socket.assigns, :review))
    |> assign(
      scripts: Utils.get_required_activity_scripts(socket.assigns.page_context.activities || [])
    )
  end
end
