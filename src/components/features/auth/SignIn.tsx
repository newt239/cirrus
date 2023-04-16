"use client";

import SignInWithGoogleButton from "~/components/blocks/SignInWithGoogleButton";
import supabase from "~/utils/supabase";

const SignIn: React.FC = () => {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return <SignInWithGoogleButton onClick={signIn} />;
};

export default SignIn;
