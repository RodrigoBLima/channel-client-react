import React, { memo } from "react";

import moment from "moment";

interface SeparatorByDayProps {
  title: string;
}

function SeparatorByDay(props: SeparatorByDayProps) {
  const { title } = props;

  function handleResolveSeparatorTitle() {
    const todayDate = moment().format("DD/MM/YYYY");
    const yesterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");

    if (title === todayDate) {
      return "Hoje";
    }

    if (title === yesterdayDate) {
      return "Ontem";
    }

    return title;
  }

  return (
    <div id="separator-by-day-container">{handleResolveSeparatorTitle()}</div>
  );
}

export default memo(SeparatorByDay);
