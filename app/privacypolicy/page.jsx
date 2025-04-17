import React from "react";
import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaShareAlt,
  FaEnvelope,
} from "react-icons/fa";

const page = () => {
  return (
    <div className="min-h-screen py-10 px-5 md:px-20" style={{ backgroundColor: "#ebd7a7" }}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: "#870407" }}>
          Privacy Policy
        </h1>
        <p className="text-center mb-6 text-sm" style={{ color: "#870407" }}>
          Effective Date: March 2025
        </p>

        <div className="space-y-6">
          <section className="flex items-start space-x-4">
            <FaUserShield style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                Information We Collect
              </h2>
              <p className="text-gray-700">
                We collect personal details such as your name, email, and phone number when you interact with our website.
              </p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaDatabase style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                How We Collect Information
              </h2>
              <p className="text-gray-700">
                Information is collected via forms, cookies, and user interactions on our platform.
              </p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaLock style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                How We Keep Your Information Safe
              </h2>
              <p className="text-gray-700">
                We use encryption, secure servers, and access controls to protect your data.
              </p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaShareAlt style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                Sharing With Third Parties
              </h2>
              <p className="text-gray-700">
                We do not share your personal data with third parties without your consent, except where required by law.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <FaEnvelope style={{ color: "#870407" }} className="text-3xl mx-auto" />
          <p className="mt-2 text-gray-700">For any queries, contact us at:</p>
          <a
            href="mailto:support@skjbmd.org"
            className="font-semibold hover:underline"
            style={{ color: "#870407" }}
          >
            support@skjbmd.org
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
