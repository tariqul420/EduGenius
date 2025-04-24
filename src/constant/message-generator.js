export function generateNotificationMessage(notification) {
  const { sender, course, beInsInfo, type } = notification;
  const senderName = sender?.firstName
    ? `${sender.firstName} ${sender.lastName || ""}`.trim()
    : sender?.email || "Someone";

  switch (type) {
    case "purchase":
      return `${senderName} purchased your course${
        course?.title ? ` "${course.title}"` : ""
      }.`;
    case "status_update":
      return `${senderName}'s instructor application status has been updated to "${beInsInfo.status}".`;
    case "new_course":
      return `${senderName} created a new course${
        course?.title ? ` "${course.title}"` : ""
      }.`;
    default:
      return `${senderName} sent you a notification.`;
  }
}
