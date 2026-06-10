"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Test, { TestsListProps, userTestResultType } from "../../app/types/testsType";

import { useRouter } from "next/navigation";

import { Grid } from "@mui/material";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorUI from "@/components/tests-page/ErrorUI";
import TestsListCard from "@/components/tests-page/TestsListCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TestsList({
  // initialTests,
  userResults,
}: TestsListProps) {
  const [tests, setTests] = useState<Test[] | undefined>([]);
  const [testResult, setTestResult] = useState<
    userTestResultType[] | undefined
  >(userResults);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!tests?.length) {
      fetchTests();
    }
  }, []);

  const fetchTests = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch("/api/tests", { cache: "no-store" });

      if (!res.ok) {
        throw new Error("error fetching data @TestsList/try");
      }

      const data = await res.json();
      setTests(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(true);
      console.error("Error: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <ErrorUI setError={setError} retryFetch={fetchTests} />;
  }

  // loading return
  if (isLoading || status === "loading") {
    return <LoadingSkeleton />;
  }

  if (!session) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {tests?.map((test: Test) => {
        const userTestResult =
          testResult?.filter((r) => r.testId === test.id) || [];
        const attemptsCount = userTestResult?.length;
        const averageScore =
          userTestResult?.length > 0
            ? userTestResult?.reduce((sum, r) => sum + (r.score || 0), 0) /
              userTestResult.length
            : 0;
        const averageScoreToFixed = averageScore.toFixed(1);
        const bestScore =
          userTestResult?.length > 0
            ? Math.max(...userTestResult.map((r) => r.score || 0))
            : 0;
        const lastScore = userTestResult[0]?.score;

        return (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={test.id}
            sx={{ display: "flex" }}
          >
            <TestsListCard
              test={test}
              attemptsCount={attemptsCount}
              averageScore={averageScoreToFixed}
              bestScore={bestScore}
              lastScore={lastScore}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
