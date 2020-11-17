import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserIndex from "./User/index"
import Dashboard from './Dashboard';
import StatisticDashboard from './Statistic/Dashboard';
import StatisticDrone from './Statistic/Drone';
import StatisticPayload from './Statistic/Payload';
import StatisticProblem from './Statistic/Problem';
import StatisticUser from './Statistic/User';
import auth from "@utils/auth";
export const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/drones',
    component: () => <div>DroneManagement</div>,
  },
  {
    path: '/drone-state',
    component: () => <div>Tình trạng drone</div>,
  },
  {
    path: '/fly-setting',
    component: () => <div>Thiết lập đường bay</div>,
  },
  {
    path: '/flight-hub',
    component: () => <div>Flight Hub</div>,
  },
  {
    path: '/payloads',
    component: () => <div>PayloadManagement</div>,
  },
  {
    path: '/metadata',
    component: () => <div>Meta Data</div>,
  },
  {
    path: '/problem',
    component: () => <div>Problem</div>,
  },
  {
    path: '/supervised-object',
    component: () => <div>Đối tượng giám sát</div>,
  },
  {
    path: '/statistic',
    component: () => <div>Báo cáo thống kê</div>,
  },
  {
    path: '/dashboard-statistic',
    component: StatisticDashboard,
  },
  {
    path: '/drone-statistic',
    component: StatisticDrone,
  },
  {
    path: '/payload-statistic',
    component: StatisticPayload,
  },
  {
    path: '/trouble-statistic',
    component: StatisticProblem,
  },
  {
    path: '/user-statistic',
    component: StatisticUser,
  },
  {
    path: '/problems',
    component: () => <div>Sự cố</div>,
  },
  {
    path: '/warning',
    component: () => <div>Cảnh báo</div>,
  },
  {
    path: '/activity-log',
    component: () => <div>Lịch sử hoạt động</div>,
  },
  {
    path: '/surveillance-domain',
    component: () => <div>Miền giám sát</div>,
  },
  {
    path: '/handle-problem',
    component: () => <div>Xử lý sự cố</div>,
  },
  {
    path: '/user-management',
    component: () => <UserIndex/>,
  },
];

const token = auth().token;
export default () => (
  <Switch>
    {routes.map(({ path, exact = false, component: Component, ...rest }) => {
      return (
        <Route
          key={path}
          exact={exact}
          path={path}
          render={(props) => token
            ? <Component />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
          {...rest}
        />
      );
    })}
    <Redirect to='/' />
  </Switch>
);
