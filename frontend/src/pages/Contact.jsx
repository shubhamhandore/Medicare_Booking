import { useState } from "react";
import { toast } from "react-toastify";
import "../App.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!email || !subject || !message) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Assume form submission via API or another method
      // For now, we'll log the values to the console
      console.log({ email, subject, message });
      // Simulate a successful form submission
      toast.success("Your message has been sent successfully!");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div>
            <label
              htmlFor="email"
              className="form_label"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form_input mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="form_label"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form_input mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="form_label"
            >
              Your Message
            </label>
            <textarea
              rows={6}
              type="text"
              id="message"
              placeholder="Leave a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form_input mt-1"
            />
          </div>
          <button
            type="submit"
            className="btn rounded sm:w-fit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
