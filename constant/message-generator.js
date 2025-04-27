export function generateNotificationMessage(notification) {
  const { sender, course, beInsInfo, type } = notification;
  const senderName = sender?.firstName
    ? `${sender.firstName} ${sender.lastName || ""}`.trim()
    : sender?.email || "Someone";

  switch (type) {
    case "purchase":
      return `You have successfully enrolled in ${senderName}'s course${course?.title ? ` "${course.title}"` : ""}!`;
    case "status_update":
      return `Your instructor application status has been updated to "${beInsInfo?.status}" by ${senderName}.`;
    case "new_course":
      return `${senderName} just launched a new course${course?.title ? ` "${course.title}"` : ""}! Check it out now.`;
    default:
      return `${senderName} sent you a notification.`;
  }
}
