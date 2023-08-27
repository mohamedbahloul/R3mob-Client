import React,{ useState, useEffect } from "react";
import {
  ButtonContainer,
  ScrollButton,
  Icon,
} from "../styles/ScrollButton.style";
import { FaArrowUp } from "react-icons/fa";
function ScrollBttn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <ButtonContainer visible={isVisible}>
      <ScrollButton onClick={scrollToTop}>
        <Icon>
          <FaArrowUp />
        </Icon>
      </ScrollButton>
    </ButtonContainer>
  );
}

export default ScrollBttn;
