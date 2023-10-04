export const headerLinks=[
    {
        path:'home',
        label: 'Home',
    },
    // {
    //     path:'about',
    //     label: 'About',
    // },
    // {
    //     path:'contact',
    //     label: 'Contact',
    // },
    // {
    //     path:'support',
    //     label: 'Support',
    // },
    {
        path:'complaint',
        label: 'Register Complaint',
    },
    
]

export const forLoggedIn=[
      {
        path:'getcomplaint',
        label: 'Get Complaint',
        role:["ROLE_ADMI", "ROLE_TECH", "ROLE_USER"]

    },
      {
        path:'getusers',
        label: 'Get Users',
        role:["ROLE_ADMI", "ROLE_TECH"]

    },
      {
        path:'profile',
        label: 'profile',
        role:["ROLE_ADMI", "ROLE_TECH", "ROLE_USER"]

    },
]
