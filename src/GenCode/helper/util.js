import React from "react";
import _ from "lodash";
import * as Tools from "../tools";

/**
 * 扫描代码, 生成包引用
 * @param code
 * @returns {string}
 */
const genAntdImport = (code = "") => {
  const antCmpts = [
    "Button",
    "Row",
    "Col",
    "Divider",
    "Affix",
    "Breadcrumb",
    "Dropdown",
    "Menu",
    "Pagination",
    "PageHeader",
    "Steps",
    "AutoComplete",
    "Checkbox",
    "Cascader",
    "DatePicker",
    "Form",
    "InputNumber",
    "Input",
    "Mentions",
    "Rate",
    "Radio",
    "Switch",
    "Slider",
    "Select",
    "TreeSelect",
    "Transfer",
    "TimePicker",
    "Upload",
    "Avatar",
    "Badge",
    "Comment",
    "Collapse",
    "Carousel",
    "Card",
    "Calendar",
    "Descriptions",
    "Empty",
    "List",
    "Popover",
    "Statistic",
    "Tree",
    "Tooltip",
    "Timeline",
    "Tag",
    "Tabs",
    "Table",
    "Alert",
    "Drawer",
    "Modal",
    "Message",
    "Notification",
    "Progress",
    "Popconfirm",
    "Result",
    "Spin",
    "Skeleton",
    "Anchor",
    "BackTop",
  ];
  const usedCmpts = [];
  antCmpts.forEach((cmpt) => {
    if (code.includes(cmpt)) {
      usedCmpts.push(cmpt);
    }
  });
  return `import { ${usedCmpts.join(",")} } from "antd"`;
};

export const getTools = () => {
  const cmptNames = Object.keys(Tools).filter((name) => name.endsWith("Meta"));
  const cmptMetas = cmptNames.map((name) => {
    return Tools[name];
  });
  return cmptMetas;
};

export const getToolNames = () => {
  return Object.keys(Tools).filter((name) => !name.endsWith("Edit") && !name.endsWith("Meta"));
};

/**
 * Props 转属性
 * @param props
 * @returns {string}
 */
export const props2Text = (props) => {
  let texts = [];
  for (let key in props) {
    const value = props[key];
    if (value === "") {
      continue;
    }
    if (value === undefined) {
      continue;
    }
    if (_.isString(value)) {
      texts.push(`${key}="${value}"`);
    } else {
      texts.push(`${key}={${value}}`);
    }
  }
  return texts.join(" ");
};

/**
 * 根据配置获取工具的组件
 * @param option
 * @returns {*}
 */
export const getToolComponent = (option) => {
  const cmpt = option.component;
  return Tools[cmpt](option).component;
};

/**
 * 根据配置获取工具的字符串描述
 * @param option
 * @returns {*}
 */
export const getToolText = (option) => {
  const cmpt = option.component;
  return Tools[cmpt](option).text;
};

/**
 * Schema 转代码
 * @param schema
 * @returns {string}
 */
export const schema2code = (schema) => {
  const codes = [];
  schema.forEach((block) => {
    const code = getToolText(block);
    codes.push(code);
  });
  codes.unshift(`<Form layout="vertical">`);
  codes.push(`</Form>`);
  return codes.join("\n");
};

/**
 * 生成配置规则
 * @param required
 * @param {string} type
 * @returns {any}
 */
export const genRules = ({ required }, type = "text") => {
  let rules = [];
  if (required) {
    rules.push({ required: true, message: "必填项" });
  }
  return type === "text" ? JSON.stringify(rules) : rules;
};

/**
 * 生成类风格的代码
 * @param code
 * @returns {string}
 */
export const genClassCode = (code) => {
  const importStr = genAntdImport(code);
  return `
/**
 * This file generated by https://github.com/rmlzy/form-builder
 */
import React from "react";
${importStr}

class AwesomeForm extends React.Component {
  render() {
    return ${code}
  }
}

export default AwesomeForm;`;
};

/**
 * 生成函数风格的代码
 * @param code
 * @returns {string}
 */
export const genFuncCode = (code) => {
  const importStr = genAntdImport(code);
  return `
/**
 * This file generated by https://github.com/rmlzy/form-builder
 */
import React from "react";
${importStr}

const AwesomeForm = () => {
  return ${code}
}

export default AwesomeForm;`;
};

export const findAndRemove = (schema, uuid) => {
  schema = _.cloneDeep(schema);
  schema = schema.filter((block) => block.uuid !== uuid);
  schema = schema.map((block) => {
    if (_.isArray(block.childes)) {
      block.childes = block.childes.filter((col) => col.uuid !== uuid);
      block.childes = block.childes.map((col) => {
        if (_.isArray(col.childes)) {
          col.childes = col.childes.filter((cmpt) => cmpt.uuid !== uuid);
        }
        return col;
      });
    }
    return block;
  });
  return schema;
};

export const findAndEdit = (schema, uuid, newData) => {
  schema = _.cloneDeep(schema);
  schema = schema.map((block) => {
    if (block.uuid === uuid) {
      block = newData;
    }
    block.childes = (block.childes || []).map((col) => {
      if (col.uuid === uuid) {
        col = newData;
      }
      col.childes = (col.childes || []).map((cmpt) => {
        if (cmpt.uuid === uuid) {
          cmpt = newData;
        }
        return cmpt;
      });
      return col;
    });
    return block;
  });
  return schema;
};
