"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

export default function AddBlog() {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Blog data:", {
      ...formData,
      author: user?.id,
    });
    setIsOpen(false);
    setFormData({ title: "", content: "", thumbnail: "" });
  };

  return (
    <div className="dark:bg-dark-bg rounded-lg bg-white p-4 shadow">
      <div className="flex items-center gap-3">
        {isLoaded && user ? (
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={user?.imageUrl}
              alt={user?.fullName || "User avatar"}
              fill
              sizes="40px"
              className="rounded-full object-cover"
              priority={false}
              quality={75}
            />
          </div>
        ) : (
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-[#181717a4]" />
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              className="dark:text-medium-bg flex-1 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-left text-gray-500 dark:bg-[#181717a4]"
              onClick={() => setIsOpen(true)}
            >
              What&apos;s on your mind?
            </button>
          </DialogTrigger>
          <DialogContent className="dark:bg-dark-bg bg-white sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">
                Create a New Blog
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your blog title"
                  required
                  maxLength={200}
                  className="border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="content"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog content here..."
                  required
                  className="min-h-[200px] resize-y border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="thumbnail"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Thumbnail URL
                </Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  placeholder="Enter thumbnail URL (optional)"
                  type="url"
                  className="border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isLoaded}
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Publish
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
