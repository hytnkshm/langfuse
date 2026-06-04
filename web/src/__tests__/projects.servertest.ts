/** @jest-environment node */

import { makeAPICall, pruneDatabase } from "@/src/__tests__/test-utils";

type ProjectsResponse = {
  data: Array<{
    id: string;
    name: string;
    organization: {
      id: string;
      name: string;
    };
    metadata: Record<string, never>;
  }>;
};

describe("/api/public/projects API Endpoint", () => {
  beforeEach(async () => await pruneDatabase());
  afterEach(async () => await pruneDatabase());

  it("returns fields required by Dify's Langfuse auth check", async () => {
    const response = await makeAPICall<ProjectsResponse>(
      "GET",
      "/api/public/projects",
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      {
        id: "7a88fb47-b4e2-43b8-a06c-a5ce950dc53a",
        name: "llm-app",
        organization: {
          id: "seed-org-id",
          name: "Seed Org",
        },
        metadata: {},
      },
    ]);
  });
});
