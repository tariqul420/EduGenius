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
import { useState } from "react";
import { toast } from "sonner";

const InfoSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="mb-3 border-b pb-2 text-lg font-semibold">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="font-medium text-gray-700 dark:text-gray-300">
      {label}:
    </span>
    <span className="">{value || "N/A"}</span>
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
          status: status,
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
        className="w-full text-left"
        onClick={() => setOpen(true)}
      >
        View Details
      </Button>
      <DialogContent className="max-h-[80vh] w-full max-w-lg overflow-x-auto rounded-lg p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
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
            <InfoItem
              label="Experience"
              value={becomeInstructorInfo?.experience}
            />
          </InfoSection>
          <InfoSection title="Application Details">
            <InfoItem
              label="Motivation"
              value={becomeInstructorInfo?.motivation}
            />
            <InfoItem
              label="Teaching Style"
              value={becomeInstructorInfo?.teachingStyle}
            />
            <InfoItem label="Status" value={becomeInstructorInfo?.status} />
          </InfoSection>
        </div>
        <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="w-full bg-green-600 hover:bg-green-700 sm:w-auto dark:bg-green-500 dark:hover:bg-green-600"
            onClick={() => {
              handleStatusUpdate("approved"), setOpen(false);
            }}
          >
            Approve
          </Button>
          <Button
            variant="destructive"
            disabled={becomeInstructorInfo.status === "approved"}
            className={`w-full sm:w-auto ${becomeInstructorInfo.status === "approved" && "cursor-not-allowed"}`}
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
