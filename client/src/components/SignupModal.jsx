import React, { useState } from "react";
import "./SignupModal.css";
import { signupUser, loginUser } from "../utils/authService";
import socket from "../utils/socket";

// Web Speech API integration for voice input
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SignupModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false); // Toggle login/signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [isVoiceActive, setIsVoiceActive] = useState(false); // State for voice input

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", phone: "" }); // reset form
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Form Data:", formData);

      let res;
      if (isLogin) {
        res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        res = await signupUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      }

      console.log("✅ API Response:", res.data);

      if (res?.data?.token) {
        localStorage.setItem("authToken", res.data.token);
        alert(`${isLogin ? "Login" : "Signup"} successful!`);
        socket.connect(); // reconnect socket
        onClose(); // close modal
      } else {
        alert("❌ Token not received from server");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  // Voice Input Handling
  const startVoiceInput = (field) => {
    if (SpeechRecognition) {
      recognition.start(); // Start the speech recognition
      setIsVoiceActive(true); // Set voice input active
    } else {
      alert("Your browser does not support speech recognition.");
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 Speech recognized:", transcript);
      setFormData((prev) => ({ ...prev, [field]: transcript })); // Set recognized text to appropriate field
      setIsVoiceActive(false); // Stop voice input after result
    };

    recognition.onerror = (event) => {
      console.error("Error occurred during speech recognition:", event.error);
      setIsVoiceActive(false); // Stop voice input on error
    };
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isLogin ? "Log In" : "Create Your Account"}</h2>

        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => startVoiceInput("email")} disabled={isVoiceActive}>🎤</button>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => startVoiceInput("password")} disabled={isVoiceActive}>🎤</button>

              <button type="submit">Log In</button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => startVoiceInput("name")} disabled={isVoiceActive}>🎤</button>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => startVoiceInput("email")} disabled={isVoiceActive}>🎤</button>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => startVoiceInput("password")} disabled={isVoiceActive}>🎤</button>

              <input
                type="text"
                name="phone"
                placeholder="Contact Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <button type="button" onClick={() => startVoiceInput("phone")} disabled={isVoiceActive}>🎤</button>

              <button type="submit">Sign Up</button>
            </>
          )}
        </form>

        <p className="login-text">
          {isLogin ? (
            <>Don't have an account? <a href="#" onClick={toggleForm}>Sign Up</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={toggleForm}>Log In</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
