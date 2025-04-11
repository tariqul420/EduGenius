import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogModal({ title, children, buttonTitle, open }) {
  return (
    <Dialog className="pointer-events-none" defaultOpen={open}>
      <DialogTrigger>{buttonTitle}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-xs overflow-y-auto p-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
