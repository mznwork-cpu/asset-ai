// import { supabase } from "@/lib/supabase";

/**
 * Email・Passwordでログイン
 */
// export async function signIn(
//   email: string,
//   password: string
// )
//  {
//   return await supabase.auth.signInWithPassword({
    // email,
    // password,
//   });
// }
/**
 * 現在ログイン中ユーザー取得
 */
// export async function getCurrentUser() {
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   return {
//     user,
//     error,
//   };
// }
// 
/**
 * システム固定ユーザー取得
 */
export async function getCurrentUser() {
  return {
    user: {
      id: "00000000-0000-0000-0000-000000000001",
    },
  };
}