"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (_data) => {
    toast.success("Your message has been sent!");
    form.reset();
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-16">
        {/* Contact Form */}
        <div className="mx-auto w-full max-w-xl text-center">
          <h1 className="mb-3 text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground mb-6">
            We&apos;d love to hear from you! Please fill out the form below.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-left"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Your message..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-main hover:bg-dark-main w-full text-white"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Info Cards */}
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-semibold">Our Contact Info</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="text-main flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle>Address</CardTitle>
                <p className="text-muted-foreground">
                  123 Eco Street, Green City, Earth
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-main flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle>Phone</CardTitle>
                <p className="text-muted-foreground">+123 456 7890</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-main flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle>Email</CardTitle>
                <p className="text-muted-foreground">support@example.com</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section using Accordion */}
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-semibold">
            Frequently Asked Questions
          </h2>
          <Accordion type="multiple" className="space-y-4 text-left">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How quickly will I receive a response?
              </AccordionTrigger>
              <AccordionContent>
                We usually respond within 24 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I contact you for partnerships?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Mention it in your message and we’ll get in touch.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Do you offer support on weekends?
              </AccordionTrigger>
              <AccordionContent>
                Support is available Monday to Friday, 9am–6pm.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Where are you located?</AccordionTrigger>
              <AccordionContent>
                We are globally remote but headquartered in Eco City.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
