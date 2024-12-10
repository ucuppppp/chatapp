"use client"
import { useRouter } from "next/navigation"
import { MouseEventHandler, useRef, ReactNode } from "react"

export default function Modal({children}: {children: ReactNode}) {
    const overlay = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const close: MouseEventHandler = (e) => {
        if (e.target === overlay.current) {
            router.back()
        }
    }

    return (
        <div 
            ref={overlay}
            onClick={close}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg">
                    {children}
                </div>
        </div>
    )
}

// "use client";

// import {useRouter} from "next/router";
// import {MouseEventHandler, useRef, ReactNode} from "react";

// export default function Modal({children}: {children: ReactNode}) {
//   const overlay = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const close: MouseEventHandler = (e) => {
//     if (e.target === overlay.current) {
//       router.back();
//     }
//   };

//   return (
//     <div
//       ref={overlay}
//       onClick={close}
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//     >
//       <div className="relative p-6 bg-white rounded-lg">{children}</div>
//     </div>
//   );
// }
