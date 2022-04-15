import { Outlet } from 'remix'
import { $path } from 'remix-routes'
import SidebarLayout from '~/ui/sidebar-layout'

export default function Component() {
  return (
    <div className="min-h-[86.5vh] relative">
      <SidebarLayout>
        <SidebarLayout.Nav>
          <SidebarLayout.NavTitle>Actions</SidebarLayout.NavTitle>
          <SidebarLayout.NavLink to={$path('/examples/redirect')}>
            Redirect
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/examples/without-redirect')}>
            Without redirect
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/examples/custom-response')}>
            Custom response
          </SidebarLayout.NavLink>
        </SidebarLayout.Nav>
        <SidebarLayout.Content>
          <div className="flex flex-col space-y-4 sm:space-y-8 text-gray-200 p-4 sm:p-8">
            <Outlet />
          </div>
        </SidebarLayout.Content>
      </SidebarLayout>
    </div>
  )
}