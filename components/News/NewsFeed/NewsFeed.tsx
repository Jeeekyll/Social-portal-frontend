import React, { FC } from "react";
import { Grid, Container } from "@mui/material";

const NewsFeed: FC = () => {
  return (
    <Container maxWidth="lg">
      <h3>News</h3>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div>Интернет</div>
          <div>Яна Ломакина</div>
          <div>5 часов</div>
          <div>+ подписаться</div>
          <div>Судья из мема «Полностью оправдан» Валерий Степанов умер от</div>
          <div>Ему было 66 лет.</div>
          <div>картинка</div>
          <div>кол-во комментов</div>
          <div>скопировать ссылку</div>
          <div>кол-во лайков</div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsFeed;
