const AppRoute = {
  home: "/",
  login: "/login",
  forget_password: "/forget-password",
  reset_password: "/reset-password",
  profile: "/my-account",

  quote: "/quotes",
  create_quote: (project_id?: string) =>
    project_id ? `quotes/create?pi=${project_id}` : `/quotes/create`,
  edit_quote: (quote_id: string) => `/quotes/${quote_id}/edit`,
  quote_detail: (quote_id: string) => `/quotes/${quote_id}`,

  inventory: "/inventory",
  create_inventory: "/inventory/add",
  inventory_edit: (inventory_id: string) => `/inventory/${inventory_id}/edit`,
  inventory_detail: (inventory_id: string) => `/inventory/${inventory_id}`,

  vendor: "/vendor",
  vendor_create: "/vendor/create",
  vendor_edit: (vendor_id: string) => `/vendor/${vendor_id}/edit`,
  vendor_detail: (vendor_id: string) => `/vendor/${vendor_id}`,

  users: "/users",
  create_user: "/users/create",
  user_edit: (user_id: string) => `/users/${user_id}/edit`,
  user_detail: (user_id: string) => `/users/${user_id}`,
  user_project: (user_id: string) => `/users/${user_id}/projects`,

  team: "/teams",
  create_team: "/teams/create",
  team_edit: (team_id: string) => `/teams/${team_id}/edit`,

  projects: "/projects",
  create_project: "/projects/create",

  project_detail: (project_id: string) => `/projects/${project_id}`,
  project_edit: (project_id: string) => `/projects/${project_id}/edit`,
  project_insight: (project_id: string, status?: string) =>
    `/projects/${project_id}/${status ?? "insight"}`,
  project_quote: (project_id: string) => `/projects/${project_id}/quote`,

  services: "/services",
  book_services: "/services/book",
  add_service: "/services/add",

  // order
  order: "/orders",
  create_order: (project_id?: string) =>
    project_id ? `orders/create?pi=${project_id}` : `/orders/create`,
  edit_order: (order_id: string) => `/orders/${order_id}/edit`,
  order_detail: (order_id: string) => `/orders/${order_id}`,

  customers: "/customers",
  create_customer: "/customers/create",
  customer_edit: (customer_id: string) => `/customers/edit/${customer_id}`,
  customer_detail: (customer_id: string) => `/customers/${customer_id}`,
  customer_project: (customer_id: string) =>
    `/customers/${customer_id}/projects`,

  // public
  electric_load_public: "/electric_load/:project_id",
};

export default AppRoute;
