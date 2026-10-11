import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";

import { AppBarLayout } from "../components/layout/AppBarLayout";
import type { RouteHandle } from "./routeHandle";
import {
  ProfilePage,
  RankingPage,
  StorePage,
  GamePage,
  SettingsPage,
} from "@/pages";
import { LevelsPage } from "@/pages/LevelsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/game" replace /> },
      { path: "game", element: <GamePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "store", element: <StorePage /> },
    ],
  },
  {
    element: <AppBarLayout />,
    children: [
      {
        path: "settings",
        element: <SettingsPage />,
        handle: { title: "Settings" } satisfies RouteHandle,
      },
      {
        path: "levels",
        element: <LevelsPage />,
        handle: { title: "Niveles" } satisfies RouteHandle,
      },
    ],
  },
  //   {
  //     path: "/",
  //     element: <DetailLayout />,
  //     children: [
  //       {
  //         path: "settings",
  //         element: <SettingsPage />,
  //         handle: { title: "Configuración" } satisfies RouteHandle,
  //       },
  //       {
  //         path: "demo",
  //         element: <DemoPage />,
  //         handle: { title: "Componentes M3" } satisfies RouteHandle,
  //       },
  //     ],
  //   },
]);
