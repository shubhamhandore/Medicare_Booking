import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com/channel/UCXXXXX", // Replace with actual URL
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
    label: "YouTube",
  },
  {
    path: "https://github.com/shubhamhandore", // Replace with actual URL
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    label: "GitHub",
  },
  {
    path: "https://www.instagram.com/shubhamhandore", // Replace with actual URL
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
    label: "Instagram",
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/", display: "About us" },
  { path: "/services", display: "Services" },
  { path: "/", display: "Blog" },
];

const quickLinks02 = [
  { path: "/find-a-doctor", display: "Find a Doctor" },
  { path: "/", display: "Request an Appointment" },
  { path: "/", display: "Find a Location" },
  { path: "/", display: "Get a Opinion" },
];

const quickLinks03 = [
  { path: "/", display: "Donate" },
  { path: "/contact", display: "Contact us" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img
              src={logo}
              alt="Company Logo"
            />
            <p className="text-[16px] leading-7 font-[400] text-textColor">
              Copyright &copy; {year} developed by Shubham Handore, all rights
              reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((items, index) => (
                <li
                  key={index}
                  className="mb-4"
                >
                  <Link
                    to={items.path}
                    className="text-[16px] leading-7 font-[700] text-textColor"
                  >
                    {items.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinks03.map((items, index) => (
                <li
                  key={index}
                  className="mb-4"
                >
                  <Link
                    to={items.path}
                    className="text-[16px] leading-7 font-[700] text-textColor"
                  >
                    {items.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((items, index) => (
                <li
                  key={index}
                  className="mb-4"
                >
                  <Link
                    to={items.path}
                    className="text-[16px] leading-7 font-[700] text-textColor"
                  >
                    {items.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
