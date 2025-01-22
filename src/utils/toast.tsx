import toast, { ToastPosition } from "react-hot-toast";

// Track the current toast ID to prevent duplicates
let activeToastId: string | null = null;
// Utility function for success toasts
export const showSuccessToast = (
  message: string,
  customToastId: string = "success",
  top: ToastPosition = "top-center"
): void => {
  // Dismiss the current active toast to prevent duplication
  if (activeToastId) {
    toast.dismiss(activeToastId);
  }

  // Show the success toast and set activeToastId
  activeToastId = toast.success(message, {
    id: customToastId,
    position: top,
    duration: 2500,
    style: {
      background: "#28a745", // Success color
      color: "#fff",
      maxWidth: "50vw",
      fontFamily: "sans-serif",
    },
    icon: <></>,
  });
};

// Close button component using Tailwind CSS
const CloseButton = ({ toastId }: { toastId: string }) => (
  <button
    onClick={() => toast.dismiss(toastId)}
    className="ml-4 text-white text-lg focus:outline-none"
  >
    &times;
  </button>
);

export const showErrorToast = (
  error: string,
  customToastId: string = "error",
  top: ToastPosition = "top-center",
  duration: number = 2500
): void => {
  try {
    // Dismiss the current active toast to prevent duplication
    if (activeToastId) {
      toast.dismiss(activeToastId);
    }

    // Get the error message string
    const errorMessage = getErrorMessage(error);

    // Type guard to ensure errorMessage is a string
    if (typeof errorMessage !== "string") {
      console.error("Invalid error message type:", errorMessage);
      return;
    }

    // Show the error toast and set activeToastId
    activeToastId = toast.custom(
      (t: { id: string; visible: boolean }) => (
        <div
          className={`flex items-center justify-between bg-red-600 text-white py-2 px-4 rounded-md max-w-[50vw]
          transition-transform transform ${
            t.visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }
          duration-500 ease-out`}
        >
          <span>{errorMessage}</span> {/* Ensure this is a string */}
          <CloseButton toastId={t.id} /> {/* Close button */}
        </div>
      ),
      {
        id: customToastId,
        position: top,
        duration: duration,
      }
    );
  } catch (err) {
    // Log and show fallback toast in case of failure
    console.error("Error displaying toast:", err);
  }
};

const getErrorMessage = (error: string): string => {
  try {
    if (typeof error === "string") {
      return error;
    }

    return "Something went wrong.";
  } catch (err) {
    console.log(err);
    toast.error("An error occurred while displaying the error notification.");
    return "An error occurred.";
  }
};
