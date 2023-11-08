import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost:9111/auth/user/signout", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          // Successful logout
          console.log("Logged out successfully");
          // Clear local storage
          localStorage.clear();
          // Redirect user to login page
          window.location.href = "/"; // You can adjust the path as needed
        } else {
          // Handle error
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, []);

  return (
    <div>
      Logging out... Please wait.
    </div>
  );
};

export default Logout;
