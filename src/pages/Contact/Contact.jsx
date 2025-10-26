import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Contact.css";


export const Contact = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://soothing-recreation-production.up.railway.app/api/contact",
        data
      );
      if (response.status === 201) {
        toast.success("Message sent successfully!");
        setData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please check your connection.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form p-5 shadow-lg rounded-4 bg-white">
              <h2
                className="text-center mb-4 fw-bold"
                style={{ color: "#212529" }}
              >
                Get in Touch
              </h2>
              <p className="text-center text-muted mb-4">
                We'd love to hear from you! Fill out the form below and we'll
                get back to you soon.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      className="form-control input-glow"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      className="form-control input-glow"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="form-control input-glow"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      value={data.message}
                      onChange={handleChange}
                      className="form-control input-glow"
                      placeholder="Your Message"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className={`btn btn-primary w-100 fw-semibold d-flex justify-content-center align-items-center ${
                        isLoading ? "opacity-50" : ""
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending Message...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
