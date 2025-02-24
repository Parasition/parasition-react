// src/routes/AppRoutes.jsx
import React from 'react';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Constants } from 'utils/constants';
import Layout from 'layout';
import PublicRoute from './publicRoute';
import ProtectedRoute from './protectedRoute';
import BreifGenerator from 'pages/breif-generator';

const CreateCampaign = lazy(() => import('pages/create-campaign'));
const OverView = lazy(() => import('pages/overview'));
const EventCampaign = lazy(() => import('pages/event-campaign'));
const ViewCampaign = lazy(() => import('pages/view-campaign'));
const ExtendCampaign = lazy(() => import('pages/extend-campaign'));
const TermsAndConditions = lazy(() => import('pages/terms-and-conditions'));
const PrivacyPolicy = lazy(() => import('pages/privacy-policy'));
const Login = lazy(() => import('pages/auth/login'));
const SignUp = lazy(() => import('pages/auth/sign-up'));
const NotFoundPage = lazy(() => import('pages/pagenotfound'));

const AppRoutes = () => {
  const { routeNames } = Constants();

  const routes = useRoutes([
    {
      path: routeNames.login,
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: routeNames.signUp,
      element: (
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      ),
    },
    {
      path: '',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: routeNames.createCampaign,
          element: <CreateCampaign />,
        },
        {
          path: routeNames.overView,
          element: <OverView />,
        },
        {
          path: routeNames.eventCampaign,
          element: <EventCampaign />,
        },
        {
          path: routeNames.viewCampaign,
          element: <ViewCampaign />,
        },
        {
          path: routeNames.extendCampaign,
          element: <ExtendCampaign />,
        },
        {
          path: routeNames.termsAndConditions,
          element: <TermsAndConditions />,
        },
        {
          path: routeNames.privacyPolicy,
          element: <PrivacyPolicy />,
        },
        {
          path: routeNames.breifGenerator,
          element: <BreifGenerator />,
        }
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <Suspense fallback="Loading...">{routes}</Suspense>;
};

export { AppRoutes };
