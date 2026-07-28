import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/cookies";

// ─── Shape mapper ────────────────────────────────────────────────────────────
function mapJsonFakeryJob(job) {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.employment_type || "Full-time",
    salary:
      job.salary_from && job.salary_to
        ? `$${job.salary_from.toLocaleString()} - $${job.salary_to.toLocaleString()}`
        : "$--",
    tags: [job.job_category, job.is_remote_work ? "Remote" : "Onsite"].filter(Boolean),
    description: job.description,
  };
}

// ─── Mock data (used when jsonfakery.com is unreachable) ─────────────────────
const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Acme Corp",
    location: "San Francisco, CA",
    employment_type: "Full-time",
    salary_from: 130000,
    salary_to: 160000,
    job_category: "Engineering",
    is_remote_work: true,
    description:
      "Build cutting-edge React applications at scale. You'll own the frontend architecture and collaborate closely with product and design teams.",
  },
  {
    id: 2,
    title: "Backend Engineer (Node.js)",
    company: "Spherical Labs",
    location: "Austin, TX",
    employment_type: "Full-time",
    salary_from: 120000,
    salary_to: 150000,
    job_category: "Engineering",
    is_remote_work: false,
    description:
      "Design and maintain high-throughput REST and GraphQL APIs. Experience with PostgreSQL and Redis is a plus.",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Notion Clone Inc.",
    location: "Remote",
    employment_type: "Full-time",
    salary_from: 100000,
    salary_to: 130000,
    job_category: "Design",
    is_remote_work: true,
    description:
      "Shape the end-to-end user experience for a fast-growing SaaS product. Proficiency in Figma and a strong portfolio required.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudNine",
    location: "New York, NY",
    employment_type: "Contract",
    salary_from: 140000,
    salary_to: 170000,
    job_category: "Infrastructure",
    is_remote_work: false,
    description:
      "Manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure on AWS. Terraform experience strongly preferred.",
  },
  {
    id: 5,
    title: "Full-Stack Developer",
    company: "Startup Ventures",
    location: "London, UK",
    employment_type: "Full-time",
    salary_from: 90000,
    salary_to: 115000,
    job_category: "Engineering",
    is_remote_work: true,
    description:
      "Wear many hats building features end-to-end with React and Django. Perfect for someone who loves variety and fast iteration.",
  },
  {
    id: 6,
    title: "Data Engineer",
    company: "DataFlow Systems",
    location: "Seattle, WA",
    employment_type: "Full-time",
    salary_from: 125000,
    salary_to: 155000,
    job_category: "Data",
    is_remote_work: true,
    description:
      "Build and maintain data pipelines using Apache Spark and dbt. Work with petabyte-scale datasets in a modern data lake architecture.",
  },
  {
    id: 7,
    title: "iOS Developer",
    company: "MobileFirst",
    location: "Berlin, DE",
    employment_type: "Full-time",
    salary_from: 95000,
    salary_to: 120000,
    job_category: "Mobile",
    is_remote_work: false,
    description:
      "Craft beautiful Swift applications with a focus on performance and accessibility. Join a team that ships to millions of users.",
  },
  {
    id: 8,
    title: "Security Engineer",
    company: "SecureStack",
    location: "Remote",
    employment_type: "Full-time",
    salary_from: 145000,
    salary_to: 180000,
    job_category: "Security",
    is_remote_work: true,
    description:
      "Lead penetration testing, threat modeling, and incident response. OSCP or equivalent certification preferred.",
  },
];

// ─── Base query with automatic fallback to mock data ─────────────────────────
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://jsonfakery.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || getCookie("hireboard-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

async function baseQueryWithFallback(args, api, extraOptions) {
  const result = await rawBaseQuery(args, api, extraOptions);

  // If there's a network-level error OR a 5xx server error, serve mock data
  if (result.error) {
    const isNetworkError = result.error.status === "FETCH_ERROR";
    const isServerError =
      typeof result.error.status === "number" && result.error.status >= 500;

    if (isNetworkError || isServerError) {
      console.warn(
        "[jobsApi] jsonfakery.com unreachable — serving mock data instead.",
        result.error
      );
      // Return mock data as if it came from the API
      return { data: MOCK_JOBS };
    }
  }

  return result;
}

// ─── API slice ────────────────────────────────────────────────────────────────
export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: baseQueryWithFallback,
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      transformResponse: (response) => (response || []).map(mapJsonFakeryJob),
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
