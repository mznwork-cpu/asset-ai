// "use client";

// import { useState } from "react";
// // import { signIn } from "@/services/auth.service";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async () => {
//     const { error } = await signIn(
//       email,
//       password
//     );

//     if (error) {
//       setErrorMessage(error.message);
//       return;
//     }

//     window.location.href = "/ipo";
//   };

//   return (
//     <div className="space-y-4">
//       <h1>ログイン</h1>

//       <div>
//         <label>メールアドレス</label>

//         <input
//           className="border ml-2 px-2 py-1"
//           type="email"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />
//       </div>

//       <div>
//         <label>パスワード</label>

//         <input
//           className="border ml-2 px-2 py-1"
//           type="password"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//         />
//       </div>

//       <button className="border px-4 py-2"
//         onClick={handleLogin}>
//         ログイン
//       </button>

//       {errorMessage && (
//         <div>
//           {errorMessage}
//         </div>
//       )}
//     </div>
//   );
// }