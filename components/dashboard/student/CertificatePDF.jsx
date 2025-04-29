/* eslint-disable no-shadow */
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

// Define styles with adjusted padding and margins
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20, // Reduced from 40 for tighter page margins
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 700, // Reduced from 900 to fit A4 landscape better
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    padding: 30, // Reduced from 40 for internal spacing
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30, // Reduced from 48 for tighter spacing
  },
  title: {
    color: "#181717",
    fontSize: 36,
    fontWeight: "bold",
  },
  certNumberLabel: {
    color: "#181717a4",
    fontSize: 12,
  },
  certNumber: {
    color: "#181717",
    fontSize: 16,
    fontWeight: "medium",
  },
  mainContent: {
    marginBottom: 40, // Reduced from 56 for balanced spacing
  },
  completionText: {
    color: "#181717a4",
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 16, // Reduced from 24
  },
  courseTitle: {
    color: "#673de5",
    fontSize: 36,
    fontWeight: "semibold",
    textTransform: "uppercase",
    marginBottom: 16, // Reduced from 24
  },
  instructorText: {
    color: "#181717a4",
    fontSize: 16,
  },
  instructorName: {
    color: "#181717",
    fontWeight: "bold",
  },
  details: {
    marginBottom: 40, // Reduced from 56
  },
  studentName: {
    color: "#181717",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12, // Added for spacing below student name
  },
  date: {
    color: "#181717a4",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 20, // Reduced from 32
  },
  footerText: {
    color: "#181717a4",
    fontSize: 12,
    marginBottom: 4, // Added for spacing between footer lines
  },
  footerBold: {
    fontWeight: "medium",
  },
  link: {
    color: "#673de5",
    textDecoration: "none",
  },
  poweredBy: {
    flexDirection: "row",
    alignItems: "center",
  },
  poweredByText: {
    color: "#181717a4",
    fontSize: 12,
    marginRight: 8,
  },
  poweredByBold: {
    color: "#181717",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const CertificatePDF = ({ certificateData }) => {
  const { certificateId, student, course, createdAt } = certificateData || {};
  const formattedDate = format(new Date(createdAt), "MMMM dd, yyyy");

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edu Genius</Text>
            <View style={{ textAlign: "right" }}>
              <Text style={styles.certNumberLabel}>Certificate Number</Text>
              <Text style={styles.certNumber}>{certificateId}</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.completionText}>Certificate of Completion</Text>
            <Text style={styles.courseTitle}>{course?.title}</Text>
            <Text style={styles.instructorText}>
              Instructors{" "}
              <Text style={styles.instructorName}>
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </Text>
            </Text>
          </View>

          {/* Details */}
          <View style={styles.details}>
            <Text style={styles.studentName}>
              {student?.firstName} {student?.lastName}
            </Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.footerText}>
                Issued by <Text style={styles.footerBold}>Edu Genius</Text>
              </Text>
              <Text style={styles.footerText}>
                Website:{" "}
                <Text style={styles.link}>https://edu-genius.vercel.app</Text>
              </Text>
            </View>
            <View style={styles.poweredBy}>
              <Text style={styles.poweredByText}>Powered by</Text>
              <Text style={styles.poweredByBold}>Edu Genius</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
