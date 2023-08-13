export default [
    {
        label: 'Home',
        path: '/',
        icon: 'home'
    },
    {
        label: 'User Management',
        path: '/users',
        icon: 'account_circle'
    },

    {
        label: 'Blog Management',
        path: '/blogs',
        icon: 'list_alt'
    },
]

interface IMenu {
    label: string
    path: string
    icon: string
}

export type { IMenu }
