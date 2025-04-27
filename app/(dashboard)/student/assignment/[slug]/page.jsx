import {
  AlertCircleIcon,
  Badge,
  ClockIcon,
  CodeIcon,
  FileTextIcon,
  GithubIcon,
  LockIcon,
  ShieldIcon,
} from "lucide-react";

export default function DetailsPage() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6">
        {/* Creative Header Section */}
        <div className="text-dark-main dark:bg-dark-bg relative overflow-hidden rounded-xl bg-white p-6 dark:text-white">
          <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/10 dark:bg-white/10"></div>
          <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-white/5 dark:bg-white/5"></div>

          <div className="relative z-10">
            <div className="mb-1 flex items-center gap-2">
              <LockIcon className="text-dark-main/80 h-5 w-5 dark:text-white/80" />
              <span className="text-dark-main/80 text-sm font-medium tracking-wider uppercase dark:text-white/80">
                Web Security Assignment
              </span>
            </div>
            <h1 className="text-3xl leading-tight font-bold md:text-4xl">
              React Authentication System
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Badge className="text-dark-main bg-white hover:bg-white/90">
                <ClockIcon className="mr-1 h-4 w-4" />
                Due: April 26, 2025
              </Badge>
              <Badge
                variant="outline"
                className="border-dark-main/30 text-dark-main dark:border-white/30 dark:text-white"
              >
                <ShieldIcon className="mr-1 h-4 w-4" />
                80 Marks
              </Badge>
            </div>
          </div>
        </div>

        {/* Assignment Description - Creative Card */}
        <div className="group text-dark-main dark:bg-dark-bg relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:text-white">
          <div className="from-dark-main/5 absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="bg-dark-main/10 text-dark-main dark:bg-dark-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <FileTextIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Task Description</h2>
                <p className="text-muted-foreground text-sm">
                  Implementation guidelines and requirements
                </p>
              </div>
            </div>
            <div className="prose prose-sm text-muted-foreground">
              <p>
                Implement a secure authentication system in React using JWT
                tokens that includes:
              </p>
              <ul className="my-3 ml-6 list-disc space-y-2">
                <li className="marker:text-dark-main">
                  User registration and login flows
                </li>
                <li className="marker:text-dark-main">
                  Protected routes with role-based access control
                </li>
                <li className="marker:text-dark-main">
                  Password reset functionality
                </li>
                <li className="marker:text-dark-main">
                  Session persistence after page refresh
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Requirements - Grid Layout */}
        <div className="grid gap-4 @md:grid-cols-2">
          {/* Required Features */}
          <div className="text-dark-main dark:bg-dark-bg rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:text-white">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-dark-main/10 text-dark-main dark:bg-dark-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <CodeIcon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">Required Features</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Form validation with React Hook Form",
                "Context API for auth state management",
                "Axios interceptors for JWT handling",
                "Error boundaries for auth flows",
                "Responsive design implementation",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="bg-dark-main mt-1 h-2 w-2 rounded-full"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evaluation Criteria */}
          <div className="text-dark-main dark:bg-dark-bg rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:text-white">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-dark-main/10 text-dark-main dark:bg-dark-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <ShieldIcon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">Evaluation Criteria</h2>
            </div>
            <div className="space-y-4">
              {[
                { name: "Code organization", value: 30, color: "bg-dark-main" },
                {
                  name: "Security practices",
                  value: 40,
                  color: "bg-dark-main/80",
                },
                { name: "UI/UX", value: 20, color: "bg-dark-main/60" },
                { name: "Documentation", value: 10, color: "bg-dark-main/40" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Info - Creative Panel */}
        <div className="text-dark-main dark:bg-dark-bg rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:text-white">
          <h2 className="mb-4 text-xl font-semibold">Your Submission</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-900">
              <div className="bg-dark-main/10 text-dark-main flex h-10 w-10 items-center justify-center rounded-lg">
                <GithubIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  GitHub Repository
                </p>
                <a
                  href="#"
                  className="hover:text-dark-main font-medium hover:underline"
                >
                  github.com/your-repo/auth-system
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                <AlertCircleIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <p className="font-medium">Grading in progress</p>
                <p className="text-muted-foreground text-xs">
                  Estimated completion: 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
