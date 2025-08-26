import { useRef, useState } from "react";

const FocusManagement = () => {
  // Multiple input refs for form management
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Ref for error message display
  const errorRef = useRef<HTMLDivElement>(null);

  // Ref for success message
  const successRef = useRef<HTMLDivElement>(null);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Function to focus next input on Enter key
  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<HTMLElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  // Function to validate and submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    if (errorRef.current) errorRef.current.textContent = "";
    if (successRef.current) successRef.current.textContent = "";

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      if (errorRef.current) {
        errorRef.current.textContent = "Please fill in all fields";
        errorRef.current.style.color = "red";
      }
      // Focus first empty field
      if (!formData.firstName) firstNameRef.current?.focus();
      else if (!formData.lastName) lastNameRef.current?.focus();
      else if (!formData.email) emailRef.current?.focus();
      return;
    }

    // Show success message
    if (successRef.current) {
      successRef.current.textContent = "Form submitted successfully!";
      successRef.current.style.color = "green";
    }

    // Focus submit button to show completion
    submitButtonRef.current?.focus();
  };

  // Function to clear form and reset focus
  const handleClear = () => {
    setFormData({ firstName: "", lastName: "", email: "" });
    if (errorRef.current) errorRef.current.textContent = "";
    if (successRef.current) successRef.current.textContent = "";
    firstNameRef.current?.focus();
  };

  // Function to focus specific field
  const focusField = (fieldRef: React.RefObject<HTMLElement>) => {
    fieldRef.current?.focus();
  };

  return (
    <div className="focus-management">
      <h2>Focus Management with useRef</h2>

      <div className="section">
        <h3>Form with Focus Management</h3>
        <p className="note">
          This form demonstrates how useRef can be used for:
        </p>
        <ul>
          <li>Managing focus between form fields</li>
          <li>Programmatic focus control</li>
          <li>Accessibility improvements</li>
          <li>Form validation with focus</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            ref={firstNameRef}
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
            placeholder="Enter first name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            ref={lastNameRef}
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            placeholder="Enter last name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            onKeyDown={(e) => handleKeyDown(e, submitButtonRef)}
            placeholder="Enter email"
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            ref={submitButtonRef}
            className="btn btn-primary"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="section">
        <h3>Focus Control Buttons</h3>
        <div className="focus-buttons">
          <button
            onClick={() => focusField(firstNameRef)}
            className="btn btn-small"
          >
            Focus First Name
          </button>
          <button
            onClick={() => focusField(lastNameRef)}
            className="btn btn-small"
          >
            Focus Last Name
          </button>
          <button
            onClick={() => focusField(emailRef)}
            className="btn btn-small"
          >
            Focus Email
          </button>
          <button
            onClick={() => focusField(submitButtonRef)}
            className="btn btn-small"
          >
            Focus Submit
          </button>
        </div>
      </div>

      <div className="section">
        <h3>Messages</h3>
        <div ref={errorRef} className="message error"></div>
        <div ref={successRef} className="message success"></div>
      </div>

      <div className="section">
        <h3>Key Features Demonstrated</h3>
        <div className="features">
          <div className="feature">
            <h4>1. Sequential Focus</h4>
            <p>Press Enter in any field to move to the next one</p>
          </div>
          <div className="feature">
            <h4>2. Programmatic Focus</h4>
            <p>Use buttons to focus specific fields</p>
          </div>
          <div className="feature">
            <h4>3. Validation Focus</h4>
            <p>
              Form automatically focuses first empty field on validation error
            </p>
          </div>
          <div className="feature">
            <h4>4. Accessibility</h4>
            <p>Proper labels and focus management for screen readers</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>useRef vs useState for Focus</h3>
        <div className="comparison">
          <div>
            <h4>useRef (What we use here)</h4>
            <ul>
              <li>Direct DOM access</li>
              <li>No re-renders</li>
              <li>Immediate focus control</li>
              <li>Perfect for imperative operations</li>
            </ul>
          </div>
          <div>
            <h4>useState (Not suitable)</h4>
            <ul>
              <li>Would trigger re-renders</li>
              <li>No direct DOM access</li>
              <li>Delayed focus control</li>
              <li>Better for declarative UI state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusManagement;
