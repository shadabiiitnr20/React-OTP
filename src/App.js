import './App.css';
import OTPLoginForm from "./components/OTPLoginForm";

function App() {
  return (
    <div className='m-2 p-2 text-center'>
      <h3 className='font-semibold underline text-xl'>Login via OTP</h3>
      <OTPLoginForm />
    </div>
  );
}

export default App;
