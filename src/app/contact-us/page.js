import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <main className="container mx-auto px-4 py-10">
           <Link href='/'>
                   <button className="border-green m-2 bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-6 text-center">
                        <ArrowLeft /> Back To Home
                      </button>
                 </Link>
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-8 text-muted-foreground">
          We'd love to hear from you! Please fill out the form below.
        </p>
  
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={5}
              placeholder="Your message..."
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
  
          <button
            type="submit"
            className=" border-green m-2 bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-"
          >
            Send Message
          </button>
          
        </form>
      </main>
    );
};

export default page;