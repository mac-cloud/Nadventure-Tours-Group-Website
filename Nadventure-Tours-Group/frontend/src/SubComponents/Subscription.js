import { useState } from "react";
import axios from "axios";
import '../Styles/styles.css';

const MagazineSubscription = () => {
    const [subscriber, setSubscriber] = useState({
      name: "",
      email: "",
    });
  
    const [status, setStatus] = useState({ message: "", error: false });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSubscriber({ ...subscriber, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Ensure you're sending the request with proper content-type
        await axios.post("http://localhost:8000/api/subscribe/", subscriber, {
          headers: {
            'Content-Type': 'application/json',  // Ensure this is set to send JSON
          },
        });
        setStatus({ message: "Subscription successful!", error: false });
        setSubscriber({ name: "", email: "" });
      } catch (err) {
        setStatus({ message: "Subscription failed. Try again", error: true });
      }
    };
  return (
    <div className="subscription-container">
     
      {status.message && (
        <div className={`alert ${status.error ? "error" : "success"}`}>
          {status.message}
        </div>
      )}
      <div className="subscription-title"><h1>Subscribe Our Newsletter</h1></div>
      <form onSubmit={handleSubmit} className="subscription-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={subscriber.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={subscriber.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default MagazineSubscription;
