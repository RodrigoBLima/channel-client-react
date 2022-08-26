import React from "react";
import styled from "@emotion/styled";

interface SpacerProps {
  width?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  margin?: string;
  background?: string;
  className?: string;
}

const Spacer = styled.section((props: SpacerProps) => ({
  width: props.width || "100%",
  height: props.height || "1px",
  marginTop: props.marginTop || "0px",
  marginBottom: props.marginBottom || "0px",
  margin: props.margin || "16px 0px 16px 0px",
  background: props.background || "#A19BA2",
}));

export default Spacer;
