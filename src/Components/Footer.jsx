import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlinePhone, MdOutlineMail } from "react-icons/md";
import { FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { IoMapOutline, IoLogoInstagram } from "react-icons/io5";
import { motion } from "framer-motion";
import visa from "../assets/visa.png";
import master from "../assets/master.jpg";
import upi from "../assets/upi.jpg";
import w from "../assets/w.jpg";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      {/* Animated Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Quick Links */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h1 className="text-lg font-semibold text-white mb-4">Quick Links</h1>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
              { to: "/cart", label: "My Orders" },
              { to: "/account", label: "My Account" },
              { to: "/pay", label: "Payment Policy" },
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `hover:text-white hover:underline transition ${
                      isActive ? "text-white font-medium" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h1 className="text-lg font-semibold text-white mb-4">Get In Touch</h1>
          <ul className="space-y-3 text-sm">
            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 6 }}
            >
              <MdOutlinePhone className="text-[#008585] text-lg" /> 7889588384
            </motion.li>
            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 6 }}
            >
              <FaWhatsapp className="text-green-500 text-lg" /> 7889588384
            </motion.li>
            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 6 }}
            >
              <MdOutlineMail className="text-red-400 text-lg" /> sshubjk@gmail.com
            </motion.li>
            <motion.li
              className="flex items-start gap-2"
              whileHover={{ x: 6 }}
            >
              <IoMapOutline className="text-blue-400 text-lg mt-1" />
              <span>Main Bazar, Rajouri, Jammu & Kashmir - 185131</span>
            </motion.li>
          </ul>
        </motion.div>

        {/* Payments */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h1 className="text-lg font-semibold text-white mb-4">We Accept</h1>
          <motion.div
            className="flex gap-3 items-center flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img src={visa} alt="visa" className="h-8 w-auto" />
            <img src={master} alt="master" className="h-8 w-auto" />
            <img src={upi} alt="upi" className="h-8 w-auto" />
            <img src={w} alt="wallet" className="h-8 w-auto" />
          </motion.div>
        </motion.div>

        {/* Social */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h1 className="text-lg font-semibold text-white mb-4">Social</h1>
          <div className="flex flex-col gap-3">
            <motion.div whileHover={{ x: 6 }}>
              <Link
                to="#facebook"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaFacebook className="text-blue-500" /> Facebook
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 6 }}>
              <Link
                to="#instagram"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <IoLogoInstagram className="text-pink-500" /> Instagram
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        © {new Date().getFullYear()} Your Company. All Rights Reserved.
      </motion.div>
    </footer>
  );
}

export default Footer;
