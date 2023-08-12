export default [
    {
        label: 'Home',
        route: '/',
        icon: 'home'
    },
    {
        label: 'User Management',
        route: '/users',
        icon: 'account_circle'
    },

    {
        label: 'Blog Management',
        route: '/blogs',
        icon: 'list_alt'
    },
]

interface IMenu {
    label: string
    route: string
    icon: string
}

export type { IMenu }
