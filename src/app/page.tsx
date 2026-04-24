import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-10">
      <div className="mx-auto max-w-2xl text-center space-y-6 px-6 lg:px-8">
            <p
              role="alert"
              className="inline-block bg-red-100 dark:bg-red-900 px-4 py-2 rounded-md text-red-700 dark:text-red-300 font-medium text-md"
            >
              <span className="mr-1">⚠️</span>
              <strong>Demo Notice:</strong>{" "}
              <span className="font-light">
                This live demo is provided solely for testing and development
                purposes. Functionality may be limited, unstable, or subject to
                sudden service restrictions. Use at your own risk;
                production-grade reliability is not guaranteed.
              </span>
            </p>
            </div>

      <div className="flex flex-col lg:flex-row items-center bg-gray-100 dark:bg-slate-900 mt-8">
{/* Left Section */}
        <div className="p-10 flex flex-col bg-white dark:bg-slate-800 text-gray-900 dark:text-white space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to Filedrop. <br />
            <br />
            Storing everything for you and your business needs. All in one
            place.
          </h1>

          <p className="text-gray-700 dark:text-gray-300">
            Enhance your personal storage experience with Filedrop, offering a simple 
            and efficient way to upload, organise, and access files from anywhere.
            Securely store important documents and media, and experience the 
            convenience of easy file management and sharing in one centralised platform.
          </p>

          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 hover:bg-blue-600 transition p-5 w-fit rounded-md items-center text-white"
          >
            Try it for free!
            <ArrowRight className="ml-4" />
          </Link>
        </div>

        {/* Right Section (Video) */}
        <div className="bg-gray-100 dark:bg-slate-900 h-full p-10 w-full flex justify-center">
          <div className="w-full max-w-2xl">
            <video autoPlay loop muted className="rounded-lg w-full h-auto">
              <source
                src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Disclaimer Section
      <div className="text-center px-4 py-6">
        <p className="font-bold text-xl">Disclaimer</p>
        <p className="text-gray-700 dark:text-gray-400 text-sm max-w-3xl mx-auto">
          This is a demo app. It is not intended for production use.
          We do not affiliate with any of the companies mentioned in this app.
          Copyright Disclaimer under section 107 of the Copyright Act 1976,
          allowance is made for “fair use” for purposes such as educational and testing purposes.
        </p>
      </div> */}
    </main>
  );
}
