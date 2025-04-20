import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateStudentStatus } from "@/lib/actions/instructor.info.action";

const InfoSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-main mb-3 border-b pb-2 text-xl font-semibold">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="text-md flex justify-between">
    <span
      className={`${label === "Status" ? "mt-4" : ""} text-md font-medium text-gray-700 dark:text-gray-300`}
    >
      {label}:
    </span>
    <span
      className={`${value === "pending" || (value === "rejected" && "text-dark-main dark:text-dark-btn bg-light-bg dark:bg-dark-bg mt-4 rounded border px-4 py-1.5 shadow")}`}
    >
      {value || "N/A"}
    </span>
  </div>
);
const InfoItemDetails = ({ label, value }) => (
  <div className="flex flex-col justify-between">
    <span className="text-md font-medium text-gray-700 dark:text-gray-300">
      {label}:
    </span>
    <span className="text-sm">{value || "N/A"}</span>
  </div>
);

export default function BecomeInstructorInfoModal({ becomeInstructorInfo }) {
  const [open, setOpen] = useState(false);

  const handleStatusUpdate = async (status) => {
    if (becomeInstructorInfo.status === status)
      return toast.error("Already Updated!");

    try {
      toast.promise(
        updateStudentStatus({
          studentId: becomeInstructorInfo?.student._id,
          status,
        }),
        {
          loading: "Status updating...",
          success: () => {
            return "Status update successfully!";
          },
          error: (err) => {
            return "Error update status. Please try again.";
          },
        },
      );
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        className="text-main bg-light-bg dark:bg-dark-bg hover:text-main w-full cursor-pointer rounded pl-2.5"
        onClick={() => setOpen(true)}
      >
        View Details
      </Button>
      <DialogContent className="max-h-[80vh] w-full overflow-x-auto rounded-lg p-6 shadow-xl md:min-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-main text-2xl font-bold">
            Instructor Application
          </DialogTitle>
          <DialogDescription>
            Review the details of the instructor application below.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <InfoSection title="Personal Information">
            <InfoItem
              label="Student"
              value={
                becomeInstructorInfo?.student?.firstName +
                " " +
                becomeInstructorInfo?.student?.lastName
              }
            />
            <InfoItem label="Phone" value={becomeInstructorInfo?.phone} />
            <InfoItem
              label="Address"
              value={
                becomeInstructorInfo?.address
                  ? `${becomeInstructorInfo.address.city}, ${becomeInstructorInfo.address.country}`
                  : null
              }
            />
          </InfoSection>
          <InfoSection title="Professional Information">
            <InfoItem
              label="Expertise"
              value={becomeInstructorInfo?.expertise}
            />
            <InfoItem
              label="Profession"
              value={becomeInstructorInfo?.profession}
            />
            <InfoItem
              label="Education"
              value={becomeInstructorInfo?.education}
            />
            <InfoItemDetails
              label="Experience"
              value={becomeInstructorInfo?.experience}
            />
          </InfoSection>
          <InfoSection title="Application Details">
            <InfoItemDetails
              label="Motivation"
              value={becomeInstructorInfo?.motivation}
            />
            <InfoItemDetails
              label="Teaching Style"
              value={becomeInstructorInfo?.teachingStyle}
            />
            <InfoItem label="Status" value={becomeInstructorInfo?.status} />
          </InfoSection>
        </div>
        <DialogFooter className="mt-0 flex flex-row justify-center gap-3 sm:mt-4 md:justify-end md:gap-4">
          <Button
            variant="outline"
            className="bg-light-bg/70 dark:hover:text-medium-bg w-fit min-w-[100px] cursor-pointer rounded shadow sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="bg-light-bg/70 dark:bg-dark-bg w-fit min-w-[100px] cursor-pointer rounded border text-green-600 shadow hover:text-green-700 sm:w-auto"
            onClick={() => {
              handleStatusUpdate("approved"), setOpen(false);
            }}
          >
            Approve
          </Button>
          <Button
            variant="outline"
            disabled={becomeInstructorInfo.status === "approved"}
            className={`bg-light-bg/70 dark:bg-dark-bg w-fit min-w-[100px] cursor-pointer rounded border px-4 text-red-600 shadow hover:text-red-700 sm:w-auto ${becomeInstructorInfo.status === "approved" && "cursor-not-allowed"}`}
            onClick={() => {
              handleStatusUpdate("rejected"), setOpen(false);
            }}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
