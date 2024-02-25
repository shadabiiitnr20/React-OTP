import { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //Handle Change Function
  const handleChange = (index, e) => {
    const value = e.target.value;

    //To check whether the input field is a Number only.
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      alert("Enter a valid value!");
      return;
    }

    const newOtp = [...otp];

    //Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //Submit trigger - Send the OTP to backend for validation
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    //Move to next input if current box is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    //Additional Validation - move to previous empty box field
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  //Handle BackSpace Functionality
  //Move to previous input field on backspace
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    //Map through the OTP array and add three event handlers to it -> onChange, onClick and onKeyDown
    //pass index and event wherever necessary
    //Referrence each input through array of refs using useRef hook
    //Refer to comments on handler functions to understand the functionality and validations
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="border-2 border-black w-12 h-12 p-1 m-1 rounded-md text-center"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
