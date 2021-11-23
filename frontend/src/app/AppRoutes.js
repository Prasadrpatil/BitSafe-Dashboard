import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Spinner from '../app/shared/Spinner'
import BuyScreen from './Screens/BuyScreen'
import SellScreen from './Screens/SellScreen'
import KycScreen from './Screens/KycScreen'
import ProfileScreen from './Screens/ProfileScreen'
import OrderScreen from './Screens/OrderScreen'
import AllUsersScreen from './Screens/AllUsersScreen'

const Dashboard = lazy(() => import('./dashboard/Dashboard'))

const Buttons = lazy(() => import('./basic-ui/Buttons'))
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'))
const Typography = lazy(() => import('./basic-ui/Typography'))

const BasicElements = lazy(() => import('./form-elements/BasicElements'))

const BasicTable = lazy(() => import('./tables/BasicTable'))

const Mdi = lazy(() => import('./icons/Mdi'))

const ChartJs = lazy(() => import('./charts/ChartJs'))

const Error404 = lazy(() => import('./error-pages/Error404'))
const Error500 = lazy(() => import('./error-pages/Error500'))

const Login = lazy(() => import('./user-pages/Login'))
const Register1 = lazy(() => import('./user-pages/Register'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/search/:keyword' component={Dashboard} />

        <Route path='/basic-ui/buttons' component={Buttons} />
        <Route path='/basic-ui/dropdowns' component={Dropdowns} />
        <Route path='/basic-ui/typography' component={Typography} />

        <Route path='/form-Elements/basic-elements' component={BasicElements} />

        <Route path='/tables/basic-table' component={BasicTable} />

        <Route path='/icons/mdi' component={Mdi} />

        <Route path='/charts/chart-js' component={ChartJs} />

        {/* <Route path='/user-pages/login-1' component={Login} /> */}
        <Route path='/login' component={Login} />
        {/* <Route path='/user-pages/register-1' component={Register1} /> */}
        <Route path='/register' component={Register1} />

        <Route path='/error-pages/error-404' component={Error404} />
        <Route path='/error-pages/error-500' component={Error500} />

        <Route path='/kyc' component={KycScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/buy/crypto' component={BuyScreen} />
        <Route path='/sell/crypto' component={SellScreen} />
        <Route path='/orders/crypto' component={OrderScreen} />
        <Route path='/admin/users' component={AllUsersScreen} />

        <Redirect to='/dashboard' />
      </Switch>
    </Suspense>
  )
}

export default AppRoutes
