import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (

  );
};

export default Modal;
