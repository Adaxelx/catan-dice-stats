import React, { useState } from "react";
import { NavigationButton, NavigationContent } from "./components";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <NavigationButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavigationContent isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};

export default Navigation;
