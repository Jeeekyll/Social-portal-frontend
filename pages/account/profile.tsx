import React, { FC, ReactElement } from "react"
import AccountLayout from "layouts/AccountLayout"
import Profile from "components/Account/Profile/Profile"

const ProfilePage: FC = (): ReactElement => {
  return (
    <AccountLayout title='Profile'>
      <Profile />
    </AccountLayout>
  )
}

export default ProfilePage
