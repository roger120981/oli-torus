defmodule OliWeb.Common.PagingParams do
  defstruct [
    :rendered_pages_count,
    :start_page_index,
    :current_page_index,
    :last_page_index,
    :label
  ]

  def calculate(total_count, offset, limit, max_rendered_pages, has_shorter_label \\ false) do
    half = ceil((max_rendered_pages - 1) / 2)

    # Calculate the index of the absolute last page (not last rendered page choice)
    # of these results. For instance, if we have 1000 results and a limit of 10, we'd
    # have a total of 100 pages, the last index of those being 99
    last_page_index = ceil(total_count / limit) - 1

    # Determine how many visible page choices we are going to render. Because we want to
    # center the "current" page, we only show a maximum of 9.
    rendered_pages = min(last_page_index + 1, max_rendered_pages)

    # Based off of the current offset and limit, set our current page index.  We assume
    # that our offset is either 0 or always a multiple of the limit
    current_page = floor(offset / limit)

    # Now determine our starting rendered page index. We want to center the current
    # page within the rendered pages, if we can
    start =
      cond do
        # When there are nine or less pages, the start is the first page
        # 0 1 2
        # S C L
        last_page_index < max_rendered_pages -> 0
        # See if there aren't enough pages to the left of the current to center it
        # 0 1 2 3 4 5 6 7 8 9 10 11 12
        # S   C                     L
        current_page <= half -> 0
        # See if there aren't enough to the right of current to center
        # 0 1 2 3 4 5 6 7 8 9 10 11 12
        #         S               C  L
        last_page_index - current_page < half -> last_page_index - (max_rendered_pages - 1)
        # When the current page can be centered, do it
        # 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
        #             S        C                            L

        true -> current_page - half
      end

    upper = min(offset + limit, total_count)

    label =
      case has_shorter_label do
        true -> "#{offset + 1} - #{upper} of #{total_count} results"
        false -> "Showing result #{offset + 1} - #{upper} of #{total_count} total"
      end

    %__MODULE__{
      rendered_pages_count: rendered_pages,
      start_page_index: start,
      current_page_index: current_page,
      last_page_index: last_page_index,
      label: label
    }
  end

  @doc """
  Calculates a new offset based on a given old offset, new limit, and the total count of items.

  The function is designed to ensure a consistent user experience during pagination adjustments:

  1. If the total count of items is less than the new limit, it will return an offset of 0.
  2. If changing the page size (`limit`), the function adjusts the `offset` to make sure
     that the current view still displays at least one of the items that were visible
     with the previous limit.
  3. The function also ensures that the resulting offset, combined with the new limit,
     does not exceed the total count of items.

  ## Examples

      iex> calculate_new_offset(4, 1, 8)
      4
      iex> calculate_new_offset(4, 10, 8)
      0

  ## Parameters

    - `old_offset`: The original offset (usually representing the starting point of the current page).
    - `new_limit`: The new desired limit (or page size).
    - `total_count`: The total number of items available for pagination.

  ## Returns

    - The new offset that is consistent with the current view and remains within the range of total items.
  """
  def calculate_new_offset(_old_offset, new_limit, total_count)
      when new_limit > total_count,
      do: 0

  def calculate_new_offset(old_offset, new_limit, total_count) do
    # Calculate new offset
    new_offset = old_offset - rem(old_offset, new_limit)

    # Ensure the new offset is within range
    if new_offset > total_count - new_limit, do: total_count - new_limit, else: new_offset
  end
end
