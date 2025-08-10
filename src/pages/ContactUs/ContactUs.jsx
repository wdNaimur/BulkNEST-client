import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-base-200 min-h-screen p-6 lg:p-12">
      {/* Heading */}
      <section className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">
          Contact Us
        </h1>
        <p className="text-secondary/80 max-w-2xl mx-auto">
          Have questions or need assistance? Our team at{" "}
          <span className="font-semibold">BulkNest</span> is here to help you.
          Fill out the form or reach us directly through the details below.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-base-100 p-8 rounded-xl shadow space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Our Office</h2>
            <p className="text-secondary/80">
              Rangpur, Bangladesh <br />
              Postal Code: 5400
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Phone</h2>
            <p className="text-secondary/80">+880 1648560748</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Email</h2>
            <p className="text-secondary/80">naimur.wd@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Business Hours</h2>
            <p className="text-secondary/80">Sat - Thu: 9:00 AM – 6:00 PM</p>
            <p className="text-secondary/80">Friday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-base-100 p-8 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-secondary/80 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full border border-secondary/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-secondary/80 mb-1">Your Email</label>
              <input
                type="email"
                className="w-full border border-secondary/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-secondary/80 mb-1">Message</label>
              <textarea
                rows="5"
                className="w-full border border-secondary/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary text-base-200 px-6 py-2 rounded-lg shadow hover:bg-secondary/90 transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
