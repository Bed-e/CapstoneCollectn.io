import React from "react";

function DeleteAccountButton({ handleDeleteAccount }) {
  const confirmAndDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      handleDeleteAccount();
    }
  };

  return (
    <div>
      <button onClick={confirmAndDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccountButton;
