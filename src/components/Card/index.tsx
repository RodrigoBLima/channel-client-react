/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React, { memo } from "react";

import classNames from "classnames";

import CounterContainer from "../Counter";
import Spacer from "../Spacer";

import EditButton from "./components/EditButton";

interface CustomCardProps {
  children: any;
  title: string;
  counterValue?: string | number;
  counterColor?: string;
  iconNode: any;
  showEditButton?: boolean;
  onClickEditButton?: () => void;
  styled?: boolean;
}

function CustomCard(props: CustomCardProps) {
  const {
    children,
    title,
    counterValue = "",
    counterColor = "",
    iconNode,
    showEditButton,
    onClickEditButton = () => {},
    styled = true,
  } = props;

  return (
    <div id="custom-card" className={classNames({ styled: !!styled })}>
      <section className="header">
        <section className="info">
          {iconNode && <img src={iconNode} alt="icon custom card" />}

          <span className="title">{title || ""}</span>
        </section>

        <section className="actions">
          {showEditButton && (
            <EditButton onClickEditButton={onClickEditButton} />
          )}
          {counterValue > 0 && (
            <CounterContainer
              value={counterValue}
              hexaDecimalColor={counterColor}
            />
          )}
        </section>
      </section>

      <Spacer className="custom-spacer" />

      <section className="body">{children}</section>
    </div>
  );
}

export default memo(CustomCard);
