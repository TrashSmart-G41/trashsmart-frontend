import { createBrowserRouter, Navigate } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'

const router = (isAuthenticated: boolean, isContractor: boolean, isOrganization:boolean) =>
  createBrowserRouter([
    // Auth routes
    {
      path: '/login',
      lazy: async () => {
        if (isAuthenticated) {
          return { Component: () => <Navigate to='/' /> }
        }
        return { Component: (await import('./pages/auth/sign-in')).default }
      },
    },
    {
      path: '/signup',
      lazy: async () => {
        if (isAuthenticated) {
          return { Component: () => <Navigate to='/' /> }
        }
        return { Component: (await import('./pages/auth/sign-up')).default }
      },
    },
    {
      path: '/forgot-password',
      lazy: async () => {
        if (isAuthenticated) {
          return { Component: () => <Navigate to='/' /> }
        }
        return {
          Component: (await import('./pages/auth/forgot-password')).default,
        }
      },
    },
    {
      path: '/reset-password',
      lazy: async () => {
        if (isAuthenticated) {
          return { Component: () => <Navigate to='/' /> }
        }
        return { Component: (await import('./pages/auth/otp')).default }
      },
    },

    // Main routes
    {
      path: '/',
      lazy: async () => {
        // if (!isAuthenticated) {
        //   const Login = await import('./pages/auth/sign-in');
        //   return { Component: Login.default };
        // }
        // if (isContractor) {
        //   const AppShell = await import('./components/app-shell')
        //   return { Component: AppShell.default }
        // } else {
        //   const Home = await import('@/pages/home')
        //   return { Component: Home.default }
        // }
        if (isContractor) {
          const AppShell = await import('./components/app-shell')
          return { Component: AppShell.default }
        }
        else if(isOrganization)
        {
          const AppShell = await import('./components/app-shell')
          return { Component: AppShell.AppShell_Ins }
        }
        const Home = await import('@/pages/home')
        return { Component: Home.default }
      },
      errorElement: <GeneralError />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import('./pages/dashboard')).default,
          }),
        },
        {
          path: 'organizations',
          lazy: async () => ({
            Component: (await import('@/pages/organizations')).default,
          }),
        },
        {
          path: 'organizations/:id',
          lazy: async () => ({
            Component: (await import('@/pages/organizations/organization'))
              .default,
          }),
        },
        {
          path: 'bins',
          lazy: async () => ({
            Component: (await import('@/pages/bins')).default,
          }),
        },
        {
          path: 'cleaners',
          lazy: async () => ({
            Component: (await import('@/pages/cleaners')).default,
          }),
        },
        {
          path: 'cleaners/:employee_id',
          lazy: async () => ({
            Component: (await import('@/pages/cleaners/cleaner')).default,
          }),
        },
        {
          path: 'drivers',
          lazy: async () => ({
            Component: (await import('@/pages/drivers')).default,
          }),
        },
        {
          path: 'drivers/:employee_id',
          lazy: async () => ({
            Component: (await import('@/pages/drivers/driver')).default,
          }),
        },
        {
          path: 'trucks',
          lazy: async () => ({
            Component: (await import('@/pages/trucks')).default,
          }),
        },
        {
          path: 'trucks/:truck_id',
          lazy: async () => ({
            Component: (await import('@/pages/trucks/truck')).default,
          }),
        },
        {
          path: 'requests',
          lazy: async () => ({
            Component: (await import('@/pages/requests')).default,
          }),
        },
        {
          path: 'dispatches',
          lazy: async () => ({
            Component: (await import('@/pages/dispatches')).default,
          }),
        },

        {
          path: 'auctions',
          lazy: async () => ({
            Component: (await import('@/pages/auctions')).default,
          }),
        },

        {
          path: 'chats',
          lazy: async () => ({
            Component: (await import('@/components/coming-soon')).default,
          }),
        },
        {
          path: 'apps',
          lazy: async () => ({
            Component: (await import('@/pages/apps')).default,
          }),
        },
        {
          path: 'users',
          lazy: async () => ({
            Component: (await import('@/components/coming-soon')).default,
          }),
        },
        {
          path: 'analysis',
          lazy: async () => ({
            Component: (await import('@/components/coming-soon')).default,
          }),
        },
        {
          path: 'extra-components',
          lazy: async () => ({
            Component: (await import('@/pages/extra-components')).default,
          }),
        },
        {
          path: 'settings',
          lazy: async () => ({
            Component: (await import('./pages/settings')).default,
          }),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('./pages/settings/profile')).default,
              }),
            },
            {
              path: 'account',
              lazy: async () => ({
                Component: (await import('./pages/settings/account')).default,
              }),
            },
            {
              path: 'appearance',
              lazy: async () => ({
                Component: (await import('./pages/settings/appearance'))
                  .default,
              }),
            },
            {
              path: 'notifications',
              lazy: async () => ({
                Component: (await import('./pages/settings/notifications'))
                  .default,
              }),
            },
            {
              path: 'display',
              lazy: async () => ({
                Component: (await import('./pages/settings/display')).default,
              }),
            },
            {
              path: 'error-example',
              lazy: async () => ({
                Component: (await import('./pages/settings/error-example'))
                  .default,
              }),
              errorElement: <GeneralError className='h-[50svh]' minimal />,
            },
          ],
        },
      ],
    },
    {
      path: '/organization',
      lazy: async () => {
        const AppShell = (await import('./components/app-shell')).AppShell_Ins
        return { Component: AppShell }
      },
      errorElement: <GeneralError />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import('./insitute_pages/dashboard')).default,
          }),
        },
        {
          path: '/organization/bins',
          lazy: async () => ({
            Component: (await import('@/insitute_pages/bins')).default,
          }),
        },
        {
          path: '/organization/cleaners',
          lazy: async () => ({
            Component: (await import('@/insitute_pages/cleaners')).default,
          }),
        },
        {
          path: '/organization/cleaners/:employee_id',
          lazy: async () => ({
            Component: (await import('@/insitute_pages/cleaners/cleaner'))
              .default,
          }),
        },
        {
          path: '/organization/requests',
          lazy: async () => ({
            Component: (await import('@/pages/requests')).default,
          }),
        },
        {
          path: '/organization/dispatches',
          lazy: async () => ({
            Component: (await import('@/pages/dispatches')).default,
          }),
        },
      ],
    },

    {
      path: 'home',
      lazy: async () => ({
        Component: (await import('@/pages/home')).default,
      }),
    },

    // Error routes
    { path: '/500', Component: GeneralError },
    { path: '/404', Component: NotFoundError },
    { path: '/503', Component: MaintenanceError },

    // Fallback 404 route
    { path: '*', Component: NotFoundError },
  ])

export default router
