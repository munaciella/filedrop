import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Filedrop. <br />
            <br />
            Storing everything for you and your business needs. All in one
            place.
          </h1>

          <p>
            Enhance your personal storage experience with Filedrop, offering a simple 
            and efficient way to upload, organise, and access files from anywhere.
            Securely store important documents and media, and experience the 
            convenience of easy file management and sharing in one centralised platform.
          </p>

          <Link
          href="/dashboard"
          className="flex cursor-pointer bg-blue-500 p-5 w-fit rounded-md items-center"
          >
            Try it for free!
            <ArrowRight className="ml-4" />
          </Link>
        </div>

        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light p-2">
        This is a demo app. It is not intended for production use.
        We do not affiliate with any of the companies mentioned in this app.
        Copyright Disclaimer under section 107 of the Copyright Act 1976,
        allowance is made for “fair use” for purposes such as educational and testing purposes.
        </p>
    </main>
  );
}
