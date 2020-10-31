import React from "react";
import toast from "toasted-notes";
import { MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { FiX, FiCheckCircle } from "react-icons/fi";

const colors = {
  error: "#d32f2f",
  success: "#388e3c",
  white: "#fff",
};

export const ErrorAlert = (text) => {
  InvokeBasicAlert(text, "error");
};

export const SuccessAlert = (text) => {
  InvokeBasicAlert(text, "success");
};

const InvokeBasicAlert = (text, type) => {
  let typeColor = "";
  let typeIcon = null;
  switch (type) {
    case "error":
      typeColor = colors.error;
      typeIcon = (
        <MdErrorOutline
          size={20}
          style={{
            marginRight: "0.3rem",
          }}
        />
      );
      break;

    case "success":
      typeColor = colors.success;
      typeIcon = (
        <FiCheckCircle
          size={20}
          style={{
            marginRight: "0.3rem",
          }}
        />
      );
      break;
  }

  toast.notify(
    (props) => (
      <div
        style={{
          background: typeColor,
          color: colors.white,
          borderRadius: "7px",
          padding: "0.8rem 1rem",
          minWidth: "10vw",
          boxShadow: "0px 7px 14px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: ".5rem",
        }}
      >
        {/* alert content */}
        {typeIcon}
        <span style={{ padding: "0.3rem", fontWeight: "bold" }}>{text}</span>

        {/*  close button */}
        <FiX
          size={20}
          style={{
            marginRight: "1rem",
            marginLeft: "1rem",
            cursor: "pointer",
          }}
          onClick={props.onClose}
        />
      </div>
    ),
    {
      duration: 5000,
      position: "bottom-right",
    }
  );
};
