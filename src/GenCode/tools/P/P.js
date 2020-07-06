import React from "react";
import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["title"]);
  const component = <p key={option.index} {...props} dangerouslySetInnerHTML={{ __html: option.text }} />;
  const text = `<p ${props2Text(props)}>${option.text}</p>`;
  return { component, text };
};