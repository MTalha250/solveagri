import { useState } from "react";
import { toast } from "react-hot-toast";
import LoadingButton from "../Button/LoadingButton";
import axios from "axios";
import CustomButton from "../Button/customButton";

interface ContactCompProps {
  title?: string;
  desc?: string;
}

const ContactComp: React.FC<ContactCompProps> = ({ title, desc }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length === 0) {
      toast.error("Please enter your name");
      return;
    }
    if (
      email.length === 0 ||
      !email.includes("@") ||
      email.includes(" ") ||
      !email.includes(".") ||
      email.includes("@.")
    ) {
      toast.error("Please enter a valid email");
      return;
    }
    if (message.length === 0) {
      toast.error("Please enter your message");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`http://localhost:4000/contact`, {
        name,
        email,
        message,
      });
      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="w-full h-full mt-9 md:mt-0  flex items-center justify-end px-10 "

    >

      <div className="flex flex-col md:flex-row items-center md:items-end bg-white rounded-lg shadow-lg p-8 md:p-12 gap-12 w-full md:w-1/2">
        {/* Left Section */}
       

        {/* Right Section - Form */}
        <form onSubmit={handleSubmit} className=" w-full">
          <div className="flex flex-col gap-6">
            <input
              className="shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Phone Number"
            />
            <input
              className="shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div className="mt-4">
              <CustomButton
                isLoading={false}
                text="Submit"
                type="submit"
                onClick={() => console.log("Button clicked!")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactComp;
