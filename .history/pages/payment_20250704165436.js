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
  DollarSign,
  CheckCircle,
  Loader2,
  AlertTriangle,
  Sun,
  Moon,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import Navbar from "./components/navbar";
import Cookies from "js-cookie";

// Utility to get token from cookies
function getTokenFromCookies() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? match[1] : "";
}

const PaymentPage = () => {
  const [theme, setTheme] = useState("dark");
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvc: "",
    amount: "250",
    referralCode: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [refundStatus, setRefundStatus] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Call backend to create Razorpay order
  const handlePayWithRazorpay = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);
    setRefundStatus(null);
    setVerificationStatus(null);

    try {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      const amountInPaise = 250 * 100; // Convert to paise

      if (!token || !userId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Step 1: Create order with enhanced error handling
      const res = await axios.post(
        "http://localhost:3005/api/payment/create-order",
        {
          referralCode: form.referralCode || "",
          userId,
          amount: amountInPaise,
          currency: "INR",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status < 500, // Don't throw for server errors
        }
      );

      // Handle different response statuses
      if (res.status >= 500) {
        throw new Error(`Server error: ${res.status}`);
      }

      if (res.status >= 400) {
        setError(res.data?.message || "Invalid request");
        setLoading(false);
        return;
      }

      const {
        success,
        orderId,
        amount: orderAmount,
        currency,
        message,
      } = res.data;

      if (!success) {
        setError(message || "Failed to create payment order");
        setLoading(false);
        return;
      }

      setOrderId(orderId);
      setPaymentId(res.data.paymentId); // Assuming backend returns paymentId

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency || "INR",
        name: "Premium Access",
        description: "Unlock premium features",
        order_id: orderId,
        handler: async (response) => {
          // Step 3: Verify payment on successful transaction
          try {
            setLoading(true);
            const verifyRes = await axios.post(
              "http://localhost:3005/api/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyRes.data.success) {
              setSuccess(true);
              setVerificationStatus("Payment verified successfully!");
            } else {
              setError(verifyRes.data.message || "Payment verification failed");
              setVerificationStatus("Verification failed");
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            setError("Payment verification failed");
            setVerificationStatus("Verification error");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: {
          color: theme === "dark" ? "#4f46e5" : "#6366f1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on("payment.failed", (response) => {
        setError(`Payment failed: ${response.error.description}`);
        setVerificationStatus("Payment failed");
      });

      setLoading(false);
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);

      let errorMessage = "Payment initiation failed";
      if (err.response) {
        errorMessage =
          err.response.data?.message ||
          `Server responded with ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "No response received from server";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!paymentId) {
      setError("No payment ID available for refund");
      return;
    }

    setLoading(true);
    setError("");
    setRefundStatus(null);

    try {
      const token = Cookies.get("token");
      const res = await axios.post(
        "http://localhost:3005/api/payment/initiate-refund-for-all",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setRefundStatus({
          success: true,
          message: "Refund initiated successfully",
          details: res.data,
        });
      } else {
        setError(res.data.message || "Refund failed");
        setRefundStatus({
          success: false,
          message: "Refund failed",
        });
      }
    } catch (err) {
      console.error("Refund error:", err);
      setError(err.response?.data?.message || "Refund processing failed");
      setRefundStatus({
        success: false,
        message: "Refund processing failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          className={`max-w-md w-full rounded-3xl shadow-2xl border backdrop-blur-xl
        ${
          theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white border-indigo-200"
        }
        p-8 md:p-12
        `}
          style={{
            minHeight: "auto",
            height: "auto",
            margin: "40px 0",
          }}
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
              Secure Payment
            </h2>
            <p
              className={`text-lg text-center ${
                theme === "dark" ? "text-gray-300" : "text-indigo-700"
              }`}
            >
              Complete your payment to unlock premium access
            </p>
          </div>
          {loading && (
            <div className="flex flex-col items-center py-6">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-500" />
              <div className="text-indigo-500 font-semibold">Processing...</div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-100 text-red-700 border border-red-200">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          {success ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center py-6">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-center text-lg">
                  Thank you for your payment. Enjoy your access!
                </p>
              </div>

              {verificationStatus && (
                <div
                  className={`p-4 rounded-xl border ${
                    verificationStatus.includes("failed")
                      ? "bg-red-100 border-red-200 text-red-700"
                      : "bg-green-100 border-green-200 text-green-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {verificationStatus.includes("failed") ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    <span>{verificationStatus}</span>
                  </div>
                  {orderId && (
                    <div className="mt-2 text-sm">
                      <p>Order ID: {orderId}</p>
                    </div>
                  )}
                </div>
              )}

              {paymentId && (
                <div className="mt-6">
                  <button
                    onClick={handleRefund}
                    disabled={loading || refundStatus?.success}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                      theme === "dark"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-red-400 hover:bg-red-500 text-white"
                    } ${
                      loading || refundStatus?.success
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <RefreshCw className="w-5 h-5" />
                    )}
                    {refundStatus?.success
                      ? "Refund Initiated"
                      : "Initiate Refund"}
                  </button>
                </div>
              )}

              {refundStatus && (
                <div
                  className={`p-4 rounded-xl border ${
                    refundStatus.success
                      ? "bg-green-100 border-green-200 text-green-700"
                      : "bg-red-100 border-red-200 text-red-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {refundStatus.success ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5" />
                    )}
                    <span>{refundStatus.message}</span>
                  </div>
                  {refundStatus.details && (
                    <div className="mt-2 text-sm">
                      <p>
                        Successful refunds:{" "}
                        {refundStatus.details.successfulRefunds?.length || 0}
                      </p>
                      <p>
                        Failed refunds:{" "}
                        {refundStatus.details.failedRefunds?.length || 0}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handlePayWithRazorpay} className="space-y-5">
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
                    disabled
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
                {loading ? "Processing..." : "Pay with Razorpay"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
