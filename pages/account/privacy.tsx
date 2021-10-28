import React, { FC } from "react";
import AccountLayout from "layouts/AccountLayout";
import Privacy from "components/Account/Privacy/Privacy";

const PrivacyPage: FC = () => {
  return (
    <AccountLayout title="Privacy">
      <Privacy />
    </AccountLayout>
  );
};

export default PrivacyPage;
