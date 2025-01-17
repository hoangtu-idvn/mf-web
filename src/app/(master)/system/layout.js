'use client'
import {Navbar} from "@/components/ui/Navbar";

export default function RootLayout({ children }) {
    return (
      <>
          <div className="main-wrap">
              <Navbar />
              <main>
                  {children}
              </main>
          </div>

      </>
    );

}