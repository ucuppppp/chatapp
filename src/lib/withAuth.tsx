import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Loader2} from "lucide-react";
import getDataByField from "./getDataByField"; // Pastikan impor fungsi dengan benar

// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  const AuthComponent: React.FC<T> = (props: T) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const token = getCookie("token");

        if (!token) {
          router.replace("/login"); // Redirect ke halaman login jika tidak ada token
          return;
        }

        try {
          const user = getCookie("currentUser");
          if (!user) {
            router.replace("/login"); // Redirect jika tidak ada user terautentikasi
            return;
          }

          // Verifikasi token dengan query Firestore
          const validToken = await getDataByField("users", "token", token);

          if (!validToken || validToken.length === 0) {
            console.log("Token verification failed");
            router.replace("/login"); // Token tidak valid
            return;
          }

          // Jika token valid
          setLoading(false); // Pengguna terotentikasi
        } catch (error) {
          console.error("Token verification failed", error);
          router.replace("/login"); // Redirect jika token tidak valid
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ); // Menampilkan loading state selama verifikasi
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}

export default withAuth;
