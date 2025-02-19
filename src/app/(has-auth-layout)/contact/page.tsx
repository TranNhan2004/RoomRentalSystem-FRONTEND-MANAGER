import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Contact us at: 123 Main Street, City, State, Zip Code</p>
      <p>Email: support@example.com</p>
      <p>Phone: (123) 456-7890</p>
    </div>
  );
}