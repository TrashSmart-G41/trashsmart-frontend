// import {
//   // IconApps,
//   // IconBarrierBlock,
//   // IconBoxSeam,
//   // IconChartHistogram,
//   // IconChecklist,
//   // IconComponents,
//   // IconError404,
//   // IconExclamationCircle,
//   // IconHexagonNumber1,
//   // IconHexagonNumber2,
//   // IconHexagonNumber3,
//   // IconHexagonNumber4,
//   // IconHexagonNumber5,
//   // IconLayoutDashboard,
//   // IconMessages,
//   // IconRouteAltLeft,
//   // IconServerOff,
//   // IconSettings,
//   // IconTruck,
//   // IconUserShield,
//   // IconUsers,
//   IconHome,

// } from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M11.03 2.59a1.5 1.5 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z'
        />
      </svg>
    ),
  },
  {
    title: 'Organizations',
    // label: '3',
    href: '/organizations',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 32 32'
      >
        <path
          fill='currentColor'
          d='M4 3v26h11v-4h2v4h11V3zm2 2h20v22h-7v-4h-6v4H6zm2 2v2h4V7zm6 0v2h4V7zm6 0v2h4V7zM8 11v2h4v-2zm6 0v2h4v-2zm6 0v2h4v-2zM8 15v2h4v-2zm6 0v2h4v-2zm6 0v2h4v-2zM8 19v2h4v-2zm6 0v2h4v-2zm6 0v2h4v-2zM8 23v2h4v-2zm12 0v2h4v-2z'
        />
      </svg>
    ),
  },
  {
    title: 'Bins',
    // label: '3',
    href: '/bins',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M9.878 4.25a2.251 2.251 0 0 1 4.244 0a.75.75 0 1 0 1.415-.5a3.751 3.751 0 0 0-7.073 0a.75.75 0 1 0 1.414.5M2.75 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17A.75.75 0 0 1 2.75 6m2.367 1.752a.75.75 0 0 1 .798.698l.46 6.9c.09 1.347.154 2.285.294 2.99c.137.685.327 1.047.6 1.303c.274.256.648.422 1.34.512c.714.093 1.654.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095c.692-.09 1.066-.256 1.34-.512c.273-.256.463-.618.6-1.303c.14-.705.204-1.643.294-2.99l.46-6.9a.75.75 0 1 1 1.497.1l-.464 6.952c-.085 1.282-.154 2.318-.316 3.132c-.169.845-.455 1.551-1.047 2.104c-.591.554-1.315.793-2.17.904c-.822.108-1.86.108-3.145.108h-.88c-1.285 0-2.323 0-3.145-.108c-.855-.111-1.579-.35-2.17-.904c-.592-.553-.878-1.26-1.047-2.104c-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 0 1 .699-.798'
        />
      </svg>
    ),
  },
  {
    title: 'Cleaners',
    // label: '3',
    href: '/cleaners',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 48 48'
      >
        <g fill='currentColor'>
          <path
            fill-rule='evenodd'
            d='M16.5 14a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0-2a2 2 0 1 1 0-4a2 2 0 0 1 0 4'
            clip-rule='evenodd'
          />
          <path d='M10 22a2 2 0 0 1 2-2v4a2 2 0 0 1-2-2' />
          <path
            fill-rule='evenodd'
            d='M34.205 27.76a4 4 0 0 1 4.797 2.997l2.999 8.545l-11.692 2.7l-1.05-8.995a4 4 0 0 1 2.997-4.797l-1.747-7.565A3 3 0 0 1 28 22h-5v17a3 3 0 1 1-6 0v-8h-1v8c0 .701-.24 1.346-.644 1.857A3 3 0 0 1 10 39V27.718c-1.563-.72-4-2.808-4-6.147C6 17.364 9.871 16 10.985 16H28c.56 0 1.086.154 1.535.422l-1.103-4.777a1 1 0 0 1 1.949-.45zm-1.5 2.398l1.95-.45a2 2 0 0 1 2.398 1.5l-5.846 1.349a2 2 0 0 1 1.499-2.399m5.003 2.95l-6.256 1.445l.584 4.997l.746-.172l-.675-2.924l1.949-.45l.675 2.924l4.643-1.072zM12 26.439l-1.163-.537C9.693 25.374 8 23.854 8 21.571c0-1.394.605-2.238 1.308-2.789a4.3 4.3 0 0 1 1.126-.63c.304-.112.494-.142.543-.15q.02-.002.008-.002H14v9h6v-9h8a1 1 0 1 1 0 2h-7v19a1 1 0 1 1-2 0V29h-5v10a1 1 0 1 1-2 0zM18 21v-3h-2v3z'
            clip-rule='evenodd'
          />
        </g>
      </svg>
    ),
  },
  {
    title: 'Trucks',
    // label: '3',
    href: '/trucks',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='1.5'
          d='M9.207 16.455C9.207 17.86 8.095 19 6.724 19s-2.483-1.14-2.483-2.546m4.966 0c0-1.405-1.112-2.545-2.483-2.545s-2.483 1.14-2.483 2.545m4.966 0h5.586m-10.552 0H3V6a1 1 0 0 1 1-1h9.793a1 1 0 0 1 1 1v2.182m5.586 8.272c0 1.406-1.111 2.546-2.482 2.546c-1.372 0-2.483-1.14-2.483-2.546m4.965 0c0-1.405-1.111-2.545-2.482-2.545c-1.372 0-2.483 1.14-2.483 2.545m4.965 0H21v-5.09l-2.515-2.579a2 2 0 0 0-1.431-.603h-2.26m.62 8.272h-.62m0 0V8.182'
        />
      </svg>
    ),
  },
  {
    title: 'Drivers',
    // label: '3',
    href: '/drivers',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 48 48'
      >
        <path
          fill='currentColor'
          fill-rule='evenodd'
          d='M15 9.5c0-.437 4.516-3.5 9-3.5s9 3.063 9 3.5c0 1.56-.166 2.484-.306 2.987c-.093.33-.402.513-.745.513H16.051c-.343 0-.652-.183-.745-.513C15.166 11.984 15 11.06 15 9.5m7.5-.5a1 1 0 1 0 0 2h3a1 1 0 0 0 0-2zm-6.462 10.218c-3.33-1.03-2.49-2.87-1.22-4.218H33.46c1.016 1.298 1.561 3.049-1.51 4.097q.05.445.05.903a8 8 0 1 1-15.962-.782m7.69.782c2.642 0 4.69-.14 6.26-.384q.012.19.012.384a6 6 0 1 1-11.992-.315c1.463.202 3.338.315 5.72.315m8.689 14.6A9.99 9.99 0 0 0 24 30a9.99 9.99 0 0 0-8.42 4.602a2.5 2.5 0 0 0-1.447-1.05l-1.932-.517a2.5 2.5 0 0 0-3.062 1.767L8.363 37.7a2.5 2.5 0 0 0 1.768 3.062l1.931.518A2.5 2.5 0 0 0 14 41.006A1 1 0 0 0 16 41v-1q0-.572.078-1.123l5.204 1.395a3 3 0 0 0 5.436 0l5.204-1.395q.077.551.078 1.123v1a1 1 0 0 0 2 .01c.56.336 1.252.453 1.933.27l1.932-.517a2.5 2.5 0 0 0 1.768-3.062l-.777-2.898a2.5 2.5 0 0 0-3.062-1.767l-1.932.517a2.5 2.5 0 0 0-1.445 1.046m-15.814 2.347A8.01 8.01 0 0 1 23 32.062v4.109a3 3 0 0 0-1.88 1.987zm14.794 0A8.01 8.01 0 0 0 25 32.062v4.109c.904.32 1.61 1.06 1.88 1.987zM24 40a1 1 0 1 0 0-2a1 1 0 0 0 0 2'
          clip-rule='evenodd'
        />
      </svg>
    ),
  },
  {
    title: 'Requests',
    // label: '3',
    href: '/requests',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 16 16'
      >
        <g fill='currentColor'>
          <path
            fill-rule='evenodd'
            d='m13.71 4.29l-3-3L10 1H4L3 2v12l1 1h5.354a4 4 0 0 1-.819-1H4V2h6l3 3v3.126q.534.138 1 .41V5zM8.126 11H6v1h2q.002-.519.126-1M6 6h2V4h1v2h2v1H9v2H8V7H6z'
            clip-rule='evenodd'
          />
          <path d='M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6' />
        </g>
      </svg>
    ),
  },
  {
    title: 'Dispatches',
    // label: '3',
    href: '/dispatches',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 24 24'
      >
        <g fill='currentColor' fill-rule='evenodd' clip-rule='evenodd'>
          <path d='M18.09 2.549c-.552-.31-1.14-.34-1.761-.263c-.59.074-1.309.26-2.172.485l-2.019.524c-.863.225-1.581.411-2.13.634c-.579.234-1.079.548-1.403 1.093c-.326.548-.358 1.134-.277 1.746c.077.577.27 1.277.5 2.111l.543 1.964c.23.835.424 1.534.655 2.07c.245.57.572 1.055 1.128 1.367c.552.309 1.14.34 1.762.262c.59-.073 1.309-.26 2.172-.485l2.019-.524c.863-.224 1.581-.411 2.13-.634c.579-.234 1.079-.548 1.403-1.093c.326-.548.358-1.134.277-1.745c-.077-.577-.27-1.278-.5-2.112l-.543-1.964c-.23-.834-.424-1.534-.655-2.07c-.245-.57-.573-1.055-1.128-1.366m-3.605 1.686c.925-.24 1.548-.4 2.03-.46c.461-.058.682-.007.843.083c.157.088.308.241.483.65c.185.43.353 1.029.601 1.927l.514 1.863c.249.898.413 1.498.474 1.96c.058.439.006.638-.08.781c-.087.147-.245.296-.675.47c-.448.181-1.07.345-1.995.585l-1.92.499c-.925.24-1.548.4-2.03.46c-.462.059-.682.008-.843-.082c-.157-.088-.308-.242-.483-.65c-.185-.43-.353-1.03-.601-1.928l-.514-1.862c-.249-.9-.413-1.499-.474-1.96c-.058-.44-.006-.638.08-.782c.087-.147.245-.296.675-.47c.448-.181 1.07-.344 1.995-.585z' />
          <path d='M3.2 4.725a.75.75 0 0 0-.4 1.445l1.703.473c.426.118.743.44.851.831l1.952 7.063a3.65 3.65 0 0 0-.225.052c-1.977.513-3.185 2.502-2.643 4.467c.54 1.955 2.594 3.082 4.563 2.57c1.724-.447 2.863-2.016 2.767-3.712l8.42-2.188a.75.75 0 0 0-.377-1.452l-8.438 2.193a3.719 3.719 0 0 0-2.506-1.91L6.8 7.074a2.707 2.707 0 0 0-1.896-1.878zM7.459 16.04c1.212-.314 2.428.389 2.74 1.519c.31 1.12-.37 2.303-1.574 2.616c-1.212.315-2.428-.389-2.74-1.519c-.31-1.12.37-2.303 1.574-2.616' />
        </g>
      </svg>
    ),
  },
  {
    title: 'Auctions',
    // label: '3',
    href: '/auctions',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18px'
        height='18px'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M14.005 20.003v2h-12v-2zM14.59.689l7.778 7.778l-1.414 1.414l-1.061-.353l-2.475 2.475l5.657 5.657l-1.414 1.414l-5.657-5.657l-2.404 2.404l.283 1.132l-1.415 1.414l-7.778-7.778l1.414-1.415l1.132.283l6.293-6.293l-.353-1.06zm.707 3.536l-7.071 7.07l3.535 3.536l7.071-7.07z'
        />
      </svg>
    ),
  },

  // {
  //   title: 'Chats',
  //   label: '9',
  //   href: '/chats',
  //   icon: <IconMessages size={18} />,
  // },
  // {
  //   title: 'Apps',
  //   label: '',
  //   href: '/apps',
  //   icon: <IconApps size={18} />,
  // },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Users',
  //   label: '',
  //   href: '/users',
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/extra-components',
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/settings',
  //   icon: <IconSettings size={18} />,
  // },
]
