import * as Page from '../pages';
type RouteType = {
    path: string;
    component: () => React.ReactElement;
};
export const routes: RouteType[] = [
    { path: '/info/:id', component: Page.InfoPage },
    { path: '/', component: Page.LoginPage },
];
