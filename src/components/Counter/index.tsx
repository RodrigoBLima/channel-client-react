/* eslint-disable react/require-default-props */
import React from "react";
import classNames from "classnames";

interface CounterContainerProps {
  value: number | string;
  classText?: string;
  hexaDecimalColor: string;
}

function CounterContainer(props: CounterContainerProps) {
  const { value, classText, hexaDecimalColor } = props;

  const counterValue = value > 99 ? `+99` : value;

  return (
    <span
      id="counter-container"
      className={classNames(classText)}
      style={{ backgroundColor: hexaDecimalColor }}
    >
      <span>{counterValue}</span>
    </span>
  );
}

export default CounterContainer;
