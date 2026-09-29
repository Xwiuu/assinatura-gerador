defmodule BracciServerWeb.Router do
  use BracciServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BracciServerWeb do
    pipe_through :api
  end
end
