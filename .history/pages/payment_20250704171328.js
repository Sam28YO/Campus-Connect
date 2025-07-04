// import { useState } from "react";
// import {
//   CreditCard,
//   User,
//   Mail,
//   DollarSign,
//   CheckCircle,
//   Loader2,
//   AlertTriangle,
//   Sun,
//   Moon,
// } from "lucide-react";
// import Image from "next/image";
// import { FaRupeeSign } from "react-icons/fa";
// import axios from "axios";
// import Navbar from "./components/navbar";
// import Cookies from "js-cookie";

// // Utility to get token from cookies
// function getTokenFromCookies() {
//   if (typeof document === "undefined") return "";
//   const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
//   return match ? match[1] : "";
// }

// const PaymentPage = () => {
//   const [theme, setTheme] = useState("dark");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     card: "",
//     expiry: "",
//     cvc: "",
//     amount: "250",
//     referralCode: "",
//   });
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   // Call backend to create Razorpay order
//   const handlePayWithRazorpay = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     setSuccess(false);

//     try {
//       const token = Cookies.get("token");
//       const userId = Cookies.get("userId");
//       const amountInPaise = 250;

//       if (!token || !userId) {
//         setError("User not authenticated");
//         setLoading(false);
//         return;
//       }

//       // Step 1: Create order with enhanced error handling
//       const res = await axios.post(
//         "http://localhost:3005/api/payment/create-order",
//         {
//           referralCode: form.referralCode || "",
//           userId,
//           amount: amountInPaise,
//           currency: "INR",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           validateStatus: (status) => status < 500, // Don't throw for server errors
//         }
//       );

//       // Handle different response statuses
//       if (res.status >= 500) {
//         throw new Error(`Server error: ${res.status}`);
//       }

//       if (res.status >= 400) {
//         setError(res.data?.message || "Invalid request");
//         setLoading(false);
//         return;
//       }

//       const {
//         success,
//         orderId,
//         amount: orderAmount,
//         currency,
//         message,
//       } = res.data;

//       if (!success) {
//         setError(message || "Failed to create payment order");
//         setLoading(false);
//         return;
//       }

//       // ... rest of your existing code ...
//     } catch (err) {
//       console.error("Full error:", err);
//       console.error("Error response:", err.response?.data);

//       let errorMessage = "Payment initiation failed";
//       if (err.response) {
//         errorMessage =
//           err.response.data?.message ||
//           `Server responded with ${err.response.status}`;
//       } else if (err.request) {
//         errorMessage = "No response received from server";
//       }

//       setError(errorMessage);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className={`min-h-screen flex flex-col items-center justify-center ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
//             : "bg-gradient-to-br from-yellow-50 via-indigo-50 to-purple-50"
//         }`}
//       >
//         <Navbar theme={theme} setTheme={setTheme} />
//         <button
//           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           className={`fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border hover:scale-110 transition-all duration-300 ${
//             theme === "dark"
//               ? "bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20"
//               : "bg-indigo-100 border-indigo-200 text-indigo-600 hover:bg-indigo-200"
//           }`}
//         >
//           {theme === "dark" ? (
//             <Sun className="w-6 h-6 text-yellow-400" />
//           ) : (
//             <Moon className="w-6 h-6 text-indigo-900" />
//           )}
//         </button>

//         <div
//           className={`max-w-md w-full rounded-3xl shadow-2xl border backdrop-blur-xl
//         ${
//           theme === "dark"
//             ? "bg-white/5 border-white/10"
//             : "bg-white border-indigo-200"
//         }
//         p-8 md:p-12
//         `}
//           style={{
//             minHeight: "auto",
//             height: "auto",
//             margin: "40px 0",
//           }}
//         >
//           <div className="flex flex-col items-center mb-8">
//             <CreditCard
//               className={`w-14 h-14 mb-4 ${
//                 theme === "dark" ? "text-yellow-400" : "text-indigo-600"
//               }`}
//             />
//             <h2
//               className={`text-3xl font-black mb-2 ${
//                 theme === "dark" ? "text-white" : "text-indigo-900"
//               }`}
//             >
//               Secure Payment
//             </h2>
//             <p
//               className={`text-lg text-center ${
//                 theme === "dark" ? "text-gray-300" : "text-indigo-700"
//               }`}
//             >
//               Complete your payment to unlock premium access
//             </p>
//           </div>
//           {loading && (
//             <div className="flex flex-col items-center py-6">
//               <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-500" />
//               <div className="text-indigo-500 font-semibold">Processing...</div>
//             </div>
//           )}
//           {error && (
//             <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-100 text-red-700 border border-red-200">
//               <AlertTriangle className="w-5 h-5" />
//               <span>{error}</span>
//             </div>
//           )}
//           {success ? (
//             <div className="flex flex-col items-center py-12">
//               <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
//               <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
//               <p className="text-center text-lg">
//                 Thank you for your payment. Enjoy your access!
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handlePayWithRazorpay} className="space-y-5">
//               <div>
//                 <label
//                   className={`block text-sm font-bold mb-2 ${
//                     theme === "dark" ? "text-gray-300" : "text-indigo-700"
//                   }`}
//                 >
//                   Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     required
//                     value={form.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
//                       theme === "dark"
//                         ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
//                         : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
//                     }`}
//                     placeholder="Full Name"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   className={`block text-sm font-bold mb-2 ${
//                     theme === "dark" ? "text-gray-300" : "text-indigo-700"
//                   }`}
//                 >
//                   Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     required
//                     value={form.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
//                       theme === "dark"
//                         ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
//                         : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
//                     }`}
//                     placeholder="you@email.com"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   className={`block text-sm font-bold mb-2 ${
//                     theme === "dark" ? "text-gray-300" : "text-indigo-700"
//                   }`}
//                 >
//                   Referral Code (optional)
//                 </label>
//                 <input
//                   type="text"
//                   value={form.referralCode}
//                   onChange={(e) => handleChange("referralCode", e.target.value)}
//                   className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
//                     theme === "dark"
//                       ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
//                       : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
//                   }`}
//                   placeholder="Referral Code"
//                 />
//               </div>
//               <div>
//                 <label
//                   className={`block text-sm font-bold mb-2 ${
//                     theme === "dark" ? "text-gray-300" : "text-indigo-700"
//                   }`}
//                 >
//                   Amount
//                 </label>
//                 <div className="relative">
//                   <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="number"
//                     required
//                     min={1}
//                     value={form.amount}
//                     onChange={(e) => handleChange("amount", e.target.value)}
//                     className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
//                       theme === "dark"
//                         ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
//                         : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
//                     }`}
//                     placeholder="Amount"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-4 rounded-xl font-black text-white transition-transform hover:scale-105 ${
//                   theme === "dark"
//                     ? "bg-gradient-to-r from-indigo-500 to-yellow-400"
//                     : "bg-gradient-to-r from-indigo-600 to-purple-600"
//                 } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
//               >
//                 {loading ? "Processing..." : "Pay with Razorpay"}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentPage;

import { useState } from "react";
import {
  CreditCard,
  User,
  Mail,
  CheckCircle,
  Loader2,
  AlertTriangle,
  Sun,
  Moon,
  ArrowRight,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./components/navbar";

const PaymentPage = () => {
  const [theme, setTheme] = useState("dark");
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "250",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: Processing, 3: Success
  const [paymentData, setPaymentData] = useState({
    orderId: null,
    paymentId: null,
    verificationStatus: null,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1: Create payment order
  const createPaymentOrder = async () => {
    try {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      const amountInPaise = Number(form.amount) * 100;

      const response = await axios.post(
        "http://localhost:3005/api/payment/create-order",
        {
          referralCode: form.referralCode || "",
          userId,
          amount: amountInPaise,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create order");
      }

      return response.data;
    } catch (error) {
      console.error("Order creation failed:", error);
      throw error;
    }
  };

  // Step 2: Verify payment (mock in this case)
  const verifyPayment = async (orderData) => {
    try {
      const token = Cookies.get("token");

      // In a real implementation, you would get these from your payment processor callback
      const mockVerificationData = {
        razorpay_order_id: orderData.orderId,
        razorpay_payment_id: `pay_${Math.random()
          .toString(36)
          .substring(2, 10)}`,
        razorpay_signature: `sig_${Math.random()
          .toString(36)
          .substring(2, 16)}`,
      };

      const response = await axios.post(
        "http://localhost:3005/api/payment/verify-payment",
        mockVerificationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Payment verification failed");
      }

      return response.data;
    } catch (error) {
      console.error("Payment verification failed:", error);
      throw error;
    }
  };

  // Step 3: Initiate refund
  const initiateRefund = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        "http://localhost:3005/api/payment/initiate-refund-for-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Refund initiation failed");
      }

      return response.data;
    } catch (error) {
      console.error("Refund failed:", error);
      throw error;
    }
  };

  // Main payment handler
  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Create order
      setCurrentStep(2);
      const orderData = await createPaymentOrder();
      setPaymentData((prev) => ({ ...prev, orderId: orderData.orderId }));

      // Step 2: Verify payment (simulated)
      const verificationData = await verifyPayment(orderData);
      setPaymentData((prev) => ({
        ...prev,
        paymentId: verificationData.paymentId,
        verificationStatus: "verified",
      }));

      // Payment successful
      setCurrentStep(3);
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Payment failed"
      );
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  // Handle refund
  const handleRefund = async () => {
    setLoading(true);
    setError("");

    try {
      const refundData = await initiateRefund();
      setPaymentData((prev) => ({
        ...prev,
        refundStatus: refundData,
      }));
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Refund failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset flow
  const resetPayment = () => {
    setCurrentStep(1);
    setPaymentData({
      orderId: null,
      paymentId: null,
      verificationStatus: null,
    });
    setError("");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
          : "bg-gradient-to-br from-yellow-50 via-indigo-50 to-purple-50"
      }`}
    >
      <Navbar theme={theme} setTheme={setTheme} />

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border hover:scale-110 transition-all duration-300 ${
          theme === "dark"
            ? "bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20"
            : "bg-indigo-100 border-indigo-200 text-indigo-600 hover:bg-indigo-200"
        }`}
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-900" />
        )}
      </button>

      <div
        className={`max-w-md w-full rounded-3xl shadow-2xl border backdrop-blur-xl ${
          theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white border-indigo-200"
        } p-8 md:p-12`}
      >
        <div className="flex flex-col items-center mb-8">
          <CreditCard
            className={`w-14 h-14 mb-4 ${
              theme === "dark" ? "text-yellow-400" : "text-indigo-600"
            }`}
          />
          <h2
            className={`text-3xl font-black mb-2 ${
              theme === "dark" ? "text-white" : "text-indigo-900"
            }`}
          >
            {currentStep === 3 ? "Payment Complete" : "Secure Payment"}
          </h2>
          <p
            className={`text-lg text-center ${
              theme === "dark" ? "text-gray-300" : "text-indigo-700"
            }`}
          >
            {currentStep === 3
              ? "Thank you for your payment!"
              : "Complete your payment to unlock premium access"}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-100 text-red-700 border border-red-200">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {currentStep === 1 && (
          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label
                className={`block text-sm font-bold mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-indigo-700"
                }`}
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                  placeholder="Full Name"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-bold mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-indigo-700"
                }`}
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-bold mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-indigo-700"
                }`}
              >
                Referral Code (optional)
              </label>
              <input
                type="text"
                value={form.referralCode}
                onChange={(e) => handleChange("referralCode", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
                placeholder="Referral Code"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-bold mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-indigo-700"
                }`}
              >
                Amount
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min={1}
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      : "bg-white border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                  placeholder="Amount"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-white transition-transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-indigo-500 to-yellow-400"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600"
              } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </form>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
            <h3 className="text-2xl font-bold mb-2">Processing Payment</h3>
            <p className="text-center">
              Please wait while we process your payment...
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col items-center py-6">
              <BadgeCheck className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-center">
                Your payment has been processed successfully.
              </p>
            </div>

            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-xl">
              <h4 className="font-bold mb-2">Payment Details</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Order ID:</span>{" "}
                  {paymentData.orderId || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Payment ID:</span>{" "}
                  {paymentData.paymentId || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Verified
                  </span>
                </p>
                <p>
                  <span className="font-medium">Amount:</span> ₹{form.amount}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetPayment}
                className={`flex-1 py-3 rounded-xl font-medium border ${
                  theme === "dark"
                    ? "border-white/20 hover:bg-white/10"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                New Payment
              </button>
              <button
                onClick={handleRefund}
                disabled={loading}
                className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                  theme === "dark"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-red-400 hover:bg-red-500 text-white"
                } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                Test Refund
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
