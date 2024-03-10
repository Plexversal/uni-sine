import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import PublishQuestions from "../../components/admin/PublishQuestions";
import ManageAi from "../../components/admin/ManageAi";
import ManageUsers from "../../components/admin/ManageUsers";
import Head from "next/head";
import { useUserContext } from "../../contexts/UserContext";

import { useState, useEffect } from "react";

function Admin(props) {
  const { user, isLoading } = useUserContext();
  const [activeComponent, setActiveComponent] = useState(null);

  if (!user) return <></>;
  if (!user?.app_metadata?.is_admin) return <></>;

  const renderComponent = () => {
    switch (activeComponent) {
      case "publishQuestions":
        return <PublishQuestions user={user} />;
      case "manageAi":
        return <ManageAi user={user} />;
      case "manageUsers":
        return <ManageUsers user={user} />;
      case "viewQuestions":
        return <ManageUsers user={user} />; // todo
      default:
        return null;
    }
  };

  return (
    <div className={styles["admin-container"]}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles["top-options"]}>
        <h1>Uni-Sine management portal</h1>
        <ul>
          <li>
            <button onClick={() => setActiveComponent("publishQuestions")}>
              Publish Questions
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("manageAi")}>
              Manage AI Integration
            </button>
          </li>
          <li>
            <button disabled onClick={() => setActiveComponent("manageUsers")}>
              Manage Users
            </button>
          </li>
          <li>
            <button
              disabled
              onClick={() => setActiveComponent("viewQuestions")}
            >
              View Questions
            </button>
          </li>
        </ul>
      </div>
      {renderComponent()}
    </div>
  );
}

export default withPageAuthRequired(Admin);
