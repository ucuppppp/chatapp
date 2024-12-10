import Sidebar from "@/components/ui/sidebar";
import withAuth from "@/lib/withAuth";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center bg-white h-screen text-black">
        <div>
          <h1>404 Not Found</h1>
        </div>
      </div>
    </>
  );
};

export default Custom404;
