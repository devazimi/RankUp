import { useRouter } from "next/navigation";

import {TestsListCardProps} from "@/app/types/testsType";
import { Card, CardContent, CardHeader, Button, Typography, Stack, Chip, CardActions } from "@mui/material";

export default function TestsListCard({test, attemptsCount, averageScore, bestScore, lastScore,}: TestsListCardProps){
    const router = useRouter();

    return(
        <Card
              sx={{
                width: "100%",
                maxWidth: "400px",
                minHeight: "280px",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: 3,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                  borderColor: "#4f46e5",
                  "& .card-header": {
                    backgroundColor: "#4f46e5",
                    "& .MuiTypography-root": {
                      color: "#ffffff",
                    },
                  },
                },
              }}
            >
              <CardHeader
                className="card-header"
                title={
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: 14, sm: 16 },
                      fontWeight: 700,
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      color: "#4f46e5",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {test.title}
                  </Typography>
                }
                sx={{
                  backgroundColor: "#f1f5f9",
                  borderBottom: "1px solid #e2e8f0",
                  transition: "background-color 0.3s ease",
                  py: 2,
                }}
              />

              <CardContent sx={{ flexGrow: 1, py: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.6,
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {test.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
                >
                  <Chip
                    label={test.difficulty}
                    size="small"
                    sx={{
                      backgroundColor:
                        test.difficulty === "easy"
                          ? "#d1fae5"
                          : test.difficulty === "medium"
                            ? "#fef3c7"
                            : "#fee2e2",
                      color:
                        test.difficulty === "easy"
                          ? "#065f46"
                          : test.difficulty === "medium"
                            ? "#92400e"
                            : "#991b1b",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                  {/* {test.duration && (
                    <Chip
                      label={`⏱️ ${test.duration} minutes`}
                      size="small"
                      sx={{
                        backgroundColor: "#e0f2fe",
                        color: "#0369a1",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  )} */}

                  {test.questions.length && (
                    <Chip
                      label={`❓ ${test.questions.length} questions`}
                      size="small"
                      sx={{
                        backgroundColor: "#f3e8ff",
                        color: "#7c3aed",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  )}

                  {attemptsCount !== 0 ? (
                    <Chip
                      label={`${attemptsCount} try`}
                      size="small"
                      sx={{
                        backgroundColor: "#ffffce",
                        color: "#535353",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  ) : null}

                  {attemptsCount !== 0 ? (
                    <Chip
                      label={`avg score ${averageScore}`}
                      size="small"
                      sx={{
                        backgroundColor: "#cefcff",
                        color: "#535353",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  ) : null}

                  {attemptsCount !== 0 ? (
                    <Chip
                      label={`best score ${bestScore}`}
                      size="small"
                      sx={{
                        backgroundColor: "#a2ffcd",
                        color: "#535353",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  ) : null}

                  {attemptsCount !== 0 ? (
                    <Chip
                      label={`last score ${lastScore}`}
                      size="small"
                      sx={{
                        backgroundColor: "#ffd2bd",
                        color: "#535353",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  ) : null}
                </Stack>
              </CardContent>

              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#4f46e5",
                    color: "white",
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: 14,
                    textTransform: "none",
                    transition: "all 0.2s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: "#4338ca",
                      transform: "scale(1.02)",
                      "&::after": {
                        transform: "translateX(100%)",
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "transform 0.5s ease",
                    },
                  }}
                  onClick={() => {
                    router.push(`/dashboard/${test.id}`);
                  }}
                >
                  {attemptsCount === 0 ? <>Start Test →</> : <>Try Again</>}
                </Button>
              </CardActions>
            </Card>
    )
}