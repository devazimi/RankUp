import { TestHeaderProps } from "@/app/types/testsType";
import { Stack, Typography } from "@mui/material";

export default function TestHeader({ test }: TestHeaderProps) {
  return (
    <Stack direction={"column"} sx={{ mb: 10 }}>
      <Stack direction={"row"}>
        <Typography variant="h5" fontFamily={"monospace"} color="#4e72f7">
          {test.title} |
        </Typography>
        <Typography variant="h5" fontFamily={"monospace"} color="#9f0a0a">
          {test.difficulty}
        </Typography>
      </Stack>
      <Typography variant="h6" fontFamily={"monospace"}>
        {test.description}
      </Typography>
    </Stack>
  );
}
