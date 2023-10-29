import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline
} from "@fortawesome/free-solid-svg-icons";

const toolbarIcons = [
  {
    label: "bold",
    style: "BOLD",
    icon: <FontAwesomeIcon icon={faBold} />
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: <FontAwesomeIcon icon={faItalic} />
  },
  {
    label: "underline",
    style: "UNDERLINE",
    icon: <FontAwesomeIcon icon={faUnderline} />
  }
];
export default toolbarIcons;
