import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  CardActions,
} from "@mui/material";
import Test from "../types/testsType";

async function getTests() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseURL}/api/tests`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching tests: ", error);

    return [];
  }
}

export default async function DashboardPage() {
  const tests: Test[] = await getTests();

  console.log("Tests data:", tests);

  return (
    <Box 
      component="section" 
      sx={{ 
        maxWidth: "100%", 
        minHeight: "100vh", 
        padding: { xs: 2, sm: 3, md: 5 },
        backgroundColor: '#f8f9fa'
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 700,
          color: '#2d3748',
          textAlign: 'center',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}
      >
        Available Tests
      </Typography>
      
      <Grid container spacing={3}>
        {tests.length > 0 ? (
          tests.map((test: Test) => (
            <Grid 
              size={{xs: 12, sm: 6, md: 4}} 
              key={test.id}
              sx={{ display: 'flex' }}
            >
              <Card 
                sx={{ 
                  width: '100%',
                  maxWidth: '400px',
                  minHeight: '280px',
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  borderRadius: 3,
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: '#4f46e5',
                    '& .card-header': {
                      backgroundColor: '#4f46e5',
                      '& .MuiTypography-root': {
                        color: '#ffffff'
                      }
                    }
                  }
                }}
              >
                {/* هدر کارت */}
                <CardHeader
                  className="card-header"
                  title={
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: 14, sm: 16 },
                        fontWeight: 700,
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        color: '#4f46e5',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {test.title}
                    </Typography>
                  }
                  sx={{
                    backgroundColor: '#f1f5f9',
                    borderBottom: '1px solid #e2e8f0',
                    transition: 'background-color 0.3s ease',
                    py: 2
                  }}
                />
                
                {/* محتوای کارت */}
                <CardContent sx={{ flexGrow: 1, py: 3 }}>
                  <Typography 
                    variant="body2" 
                    sx={{
                      fontSize: 14,
                      color: '#64748b',
                      lineHeight: 1.6,
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {test.description}
                  </Typography>
                  
                  {/* اطلاعات اضافی */}
                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    {/* سطح سختی */}
                    <Chip
                      label={test.difficulty}
                      size="small"
                      sx={{
                        backgroundColor: 
                          test.difficulty === 'آسان' ? '#d1fae5' : 
                          test.difficulty === 'متوسط' ? '#fef3c7' : 
                          '#fee2e2',
                        color: 
                          test.difficulty === 'آسان' ? '#065f46' : 
                          test.difficulty === 'متوسط' ? '#92400e' : 
                          '#991b1b',
                        fontWeight: 600,
                        fontSize: 12
                      }}
                    />
                    
                    {/* زمان تخمینی */}
                    {test.duration && (
                      <Chip
                        label={`⏱️ ${test.duration} دقیقه`}
                        size="small"
                        sx={{
                          backgroundColor: '#e0f2fe',
                          color: '#0369a1',
                          fontWeight: 500,
                          fontSize: 12
                        }}
                      />
                    )}
                    
                    {/* تعداد سوالات */}
                    {test.questions.length && (
                      <Chip
                        label={`❓ ${test.questions.length} questions`}
                        size="small"
                        sx={{
                          backgroundColor: '#f3e8ff',
                          color: '#7c3aed',
                          fontWeight: 500,
                          fontSize: 12
                        }}
                      />
                    )}
                    
                    {/* دسته‌بندی
                    {test.questionType && (
                      <Chip
                        label={`📂 ${test.category}`}
                        size="small"
                        sx={{
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          fontWeight: 500,
                          fontSize: 12
                        }}
                      />
                    )} */}
                  </Stack>
                </CardContent>
                
                {/* دکمه‌های تعاملی */}
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: '#4338ca',
                        transform: 'scale(1.02)',
                        '&::after': {
                          transform: 'translateX(100%)'
                        }
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'transform 0.5s ease'
                      }
                    }}
                    // onClick={() => {
                    //   // تابع ورود به تست
                    //   console.log(`ورود به تست: ${test.id}`);
                    //   // window.location.href = `/test/${test.id}`;
                    // }}
                  >
                    Start Test →
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={{xs: 12}}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 10,
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                border: '2px dashed #e2e8f0'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#94a3b8',
                  fontWeight: 500,
                  fontSize: { xs: 16, sm: 18 }
                }}
              >
                📝 هیچ آزمونی یافت نشد
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#cbd5e1',
                  mt: 1,
                  fontSize: { xs: 12, sm: 14 }
                }}
              >
                آزمون‌ها به زودی اضافه خواهند شد
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );}
