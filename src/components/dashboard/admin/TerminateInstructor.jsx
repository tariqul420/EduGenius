import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TerminateInstructor({ instructorId, instructorName }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <Button
        variant="ghost"
        className="text-main bg-light-bg dark:bg-dark-bg hover:text-main w-full cursor-pointer rounded pl-2.5"
        onClick={() => setOpenModal(true)}
      >
        Terminate
      </Button>
      <DialogContent className="max-h-[80vh] w-full max-w-md overflow-x-auto rounded-lg p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-600 dark:text-red-400">
            Terminate Instructor
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Are you sure you want to terminate{" "}
            <span className="font-semibold">
              {instructorName || "this instructor"}
            </span>
            ? This action cannot be undone and will remove their access to the
            platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-100 sm:w-auto dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700 sm:w-auto dark:bg-red-500 dark:hover:bg-red-600"
          >
            Termination
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
