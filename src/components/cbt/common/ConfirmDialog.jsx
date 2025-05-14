import React from "react";
import { X, AlertTriangle, AlertCircle, Info } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = "warning",
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <AlertCircle size={24} className="text-red-500" />;
      case "warning":
        return <AlertTriangle size={24} className="text-amber-500" />;
      case "info":
        return <Info size={24} className="text-blue-500" />;
    }
  };

  const variantClasses = {
    danger: {
      icon: "text-red-500",
      confirmButton: "bg-red-600 hover:bg-red-700 text-white",
      header: "border-red-100",
      ring: "ring-red-200",
    },
    warning: {
      icon: "text-amber-500",
      confirmButton: "bg-amber-600 hover:bg-amber-700 text-white",
      header: "border-amber-100",
      ring: "ring-amber-200",
    },
    info: {
      icon: "text-blue-500",
      confirmButton: "bg-blue-600 hover:bg-blue-700 text-white",
      header: "border-blue-100",
      ring: "ring-blue-200",
    },
  };

  const classes = variantClasses[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <div
        className={`bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden transform transition-all ring-1 ${classes.ring}`}
        style={{ animation: "scaleIn 0.3s ease-out" }}
      >
        <div
          className={`border-b ${classes.header} px-6 py-4 flex justify-between items-center`}
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            {getIcon()}
            <span className="ml-2">{title}</span>
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${classes.confirmButton} rounded-lg font-medium transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmDialog;
