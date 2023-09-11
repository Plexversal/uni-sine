import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import PublishQuestions from "../../components/admin/PublishQuestions";
import ManageAi from '../../components/admin/ManageAi';
import ManageUsers from '../../components/admin/ManageUsers';

import { useState, useEffect } from "react";

function Admin(props) {
  const [activeComponent, setActiveComponent] = useState(null);

  if (!props.user) return <></>;
  if (!props.user?.app_metadata?.is_admin) return <></>;

  const renderComponent = () => {
    switch (activeComponent) {
      case 'publishQuestions':
        return <PublishQuestions user={props.user} />;
      case 'manageAi':
        return <ManageAi user={props.user} />;
      case 'manageUsers':
        return <ManageUsers user={props.user}/>;
      case 'viewQuestions':
        return <ManageUsers user={props.user}/>; // todo
      default:
        return null;
    }
  };

  return (
    <div className={styles["admin-container"]}>
      <div className={styles['top-options']}>
      <h1>Uni-Sine management portal</h1>
      <ul>
        <li>
          <button onClick={() => setActiveComponent('publishQuestions')}>Publish Questions</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('manageAi')}>Manage AI Integration</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('manageUsers')}>Manage Users</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('viewQuestions')}>View Questions</button>
        </li>
      </ul>
      </div>
      {renderComponent()}
    </div>
  );
}

export default withPageAuthRequired(Admin);
