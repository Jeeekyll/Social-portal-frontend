import React from "react"
import { NextPage } from "next"
import AccountLayout from "layouts/AccountLayout"
import Articles from "components/Account/Articles/Articles"

const ArticlesPage: NextPage = () => {
  return (
    <AccountLayout title='Your articles'>
      <Articles />
    </AccountLayout>
  )
}

export default ArticlesPage
