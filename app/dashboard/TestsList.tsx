"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Test from "../types/testsType";

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

interface initialTestsProp {
    initialTests?: Test[] | undefined
}

export default function TestsList({initialTests}: initialTestsProp){
    const [tests, setTests] = useState<Test[] | undefined>(initialTests);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const {data: session, status} = useSession();

    console.log("session: ", session)

    useEffect(()=> {
        if(!initialTests?.length){
            fetchTests();
        }
    },[])

    const fetchTests = async() => {
        try{
            setLoading(true);
            const res = await fetch('/api/tests', {cache: "no-store"});

            if(!res.ok){
                throw new Error('error fetching data @TestsList/try');
            }

            const data = await res.json();
            setTests(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(err: any){
            setError('error fetching data @TestsList/catch');
            console.error("Error: ", err.message);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <>
        {session ? (
            <Grid container spacing={3}>
            {tests !== undefined ? (
              tests?.map((test: Test) => (
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
                      <Button onClick={()=> signOut()}>sign out</Button>
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

        ):(<Typography>no session</Typography>)}
        </>
    )
}