// components/DashboardSkeleton.tsx
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Grid,
} from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton variant="rounded" width={200} height={40} sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
            <Card>
              <CardContent>
                <Skeleton variant="rounded" height={150} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={40}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
