import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Phone } from "lucide-react";
import InstructorContactForm from "./InstructorContactForm";

export default function InstructorTab() {
  return (
    <Tabs defaultValue="about" className="mt-8 w-full">
      <TabsList className="w-full rounded-none bg-white py-6 shadow-lg dark:bg-black">
        <TabsTrigger
          value="about"
          className="data-[state=active]:bg-main rounded-none py-6 data-[state=active]:text-white dark:bg-black"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="course"
          className="data-[state=active]:bg-main rounded-none py-6 data-[state=active]:text-white"
        >
          Course
        </TabsTrigger>
        <TabsTrigger
          value="contact"
          className="data-[state=active]:bg-main rounded-none py-6 data-[state=active]:text-white"
        >
          Contact
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="course">Change your contact here.</TabsContent>
      <TabsContent value="contact" className="mt-8 w-full">
        <div className="flex flex-col gap-4 sm:flex-row">
          <InstructorContactForm />

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                Get in touch with instructor
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-main block w-fit rounded-sm p-2">
                  <Phone strokeWidth={2} size={14} className="text-white" />
                </span>
                <span className="text-sm text-gray-500">01256325412</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-main block w-fit rounded-sm p-2">
                  <Mail strokeWidth={2} size={14} className="text-white" />
                </span>
                <span className="text-sm text-gray-500">
                  denis@10minschool.com
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-main block w-fit rounded-sm p-2">
                  <MapPin strokeWidth={2} size={16} className="text-white" />
                </span>
                <span className="text-sm text-gray-500">Mirpur,DOHS</span>
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
