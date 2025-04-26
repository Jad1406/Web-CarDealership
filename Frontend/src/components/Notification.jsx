import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'; // Import icons

const Notification = (props) => {
    const { desc, type, autoClose = true, duration = 3000 } = props; // Add type and autoClose props

    const [isVisible, setIsVisible] = useState(true); // Control visibility with state

    useEffect(() => {
        if (autoClose && isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration); // Use duration prop
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, isVisible]);

    const getNotificationContent = (condition) => {
        switch (condition) {
            case 1:
                return {
                    message: "Logged in successfully!",
                    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                    bgColor: "bg-green-100",
                    textColor: "text-green-700",
                };
            case 2:
                return {
                    message: "Unsuccessful Login",
                    icon: <XCircle className="h-5 w-5 text-red-400" />,
                    bgColor: "bg-red-100",
                    textColor: "text-red-700",
                };
            case 3:
                return {
                    message: "Incorrect Username or Password",
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
                    bgColor: "bg-yellow-100",
                    textColor: "text-yellow-700",
                };
            case 4:
                return {
                    message: "Username already in use",
                    icon: <XCircle className="h-5 w-5 text-red-400" />,
                    bgColor: "bg-red-100",
                    textColor: "text-red-700",
                };
            case 5:
                return {
                    message: "Email already in use",
                    icon: <XCircle className="h-5 w-5 text-red-400" />,
                    bgColor: "bg-red-100",
                    textColor: "text-red-700",
                };
            case 6:
                return {
                    message: "Invalid email address",
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
                    bgColor: "bg-yellow-100",
                    textColor: "text-yellow-700",
                };
            case 7:
                return {
                    message: "Please log in to continue",
                    icon: <Info className="h-5 w-5 text-blue-400" />,
                    bgColor: "bg-blue-100",
                    textColor: "text-blue-700",
                };
            case 8:
                return {
                    message: "Passwords do not match",
                    icon: <XCircle className="h-5 w-5 text-red-400" />,
                    bgColor: "bg-red-100",
                    textColor: "text-red-700",
                };
            case 9:
                return {
                    message: "Appointment Booked Successfully",
                    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                    bgColor: "bg-green-100",
                    textColor: "text-green-700"
                }
            default:
                return {
                    message: "An unexpected condition occurred",
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
                    bgColor: "bg-yellow-100",
                    textColor: "text-yellow-700",
                };
        }
    };

    const { message, icon, bgColor, textColor } = getNotificationContent(desc);

    // Default position and styling
    const baseClasses = `fixed top-4 right-4 z-50 p-3 rounded-lg shadow-lg flex items-center gap-2 ${bgColor} ${textColor}`;

    const notificationVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={notificationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={baseClasses}
                    role="alert" // Add role for accessibility
                >
                    {icon}
                    <span className="font-medium">{message}</span>
                    {/* Close button (optional, for non-autoclose) */}
                    {!autoClose && (
                        <button
                            onClick={() => setIsVisible(false)}
                            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <XCircle className="h-4 w-4" />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
