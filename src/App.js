import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import User from "./pages/User";
import Settings from "./pages/Settings";
import Navigation from "./components/Navigation";
import useInitDataStore from "./hooks/useInitDataStore";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import { CircularLoader } from "@dhis2/ui";

const MyApp = () => {
  const { isInitialized, loading } = useInitDataStore();

  if (loading) {
    return (
      <div className={styles.appLoadingContainer}>
        <div className="my-2 flex items-center gap-2">
          <CircularLoader small />
          <div>Initialization...</div>
        </div>
      </div>
    );
  }

  return isInitialized ? (
    <HashRouter>
      <div className={styles.container}>
        <div className={styles.left}>
          <Navigation />
        </div>

        <div className={styles.right}>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/users" element={<User />} />
            <Route exact path="/users/new" element={<CreateUser />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  ) : (
    <div>Couldn't Initialize data store</div>
  );
};

export default MyApp;
