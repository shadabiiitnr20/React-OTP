import { useState } from "react";
import OtpInput from "./OtpInput";

//Create a Form to Enter a Phone Number
//Validate the Phone Number thru regex
//If Phone Number is valid show the OTP component
//Pass the Length = 4 and onOtpSubmit function as props 

const OTPLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPComponent, setShowOTPComponent] = useState(false);

  const handlePhoneNumberEntered = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();

    const regex = /^[0-9]{10}$/;

    if (regex.test(phoneNumber)) {
      setShowOTPComponent(true);
      setPhoneNumber("");
    } else {
      alert("Enter a valid phone number!");
    }
  };

  const onOtpSubmit = (otp) => {
    // console.log("Login Successfull", otp)
    if (otp.length === 4) {
      setTimeout(() => {
        alert("Login Successfull...!!!");
        setShowOTPComponent(false);
      }, 100);
    }
  };

  return (
    <div className="mt-4 ">
      {!showOTPComponent ? (
        <form onSubmit={handlePhoneNumberSubmit}>
          <input
            type="text"
            value={phoneNumber}
            placeholder="Enter Your Phone Number"
            className="w-56 p-2 m-2 outline rounded-md"
            onChange={handlePhoneNumberEntered}
          />
          <button
            type="submit"
            className="p-1 m-1 bg-gray-400 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p className="text-md mb-4">Enter OTP Sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default OTPLoginForm;
