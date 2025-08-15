import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MainLayout from '../layouts/MainLayout';

const Home: React.FC = () => {
  return (
    <MainLayout title="Sistema de Gestión Universitaria">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Sistema de Gestión Universitaria
        </Typography>
        <Typography variant="body1" paragraph>
          Esta aplicación te permite gestionar todos los aspectos de la universidad, incluyendo estudiantes, profesores, cursos, matrículas y más.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PeopleIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Estudiantes</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Gestiona la información de los estudiantes, incluyendo datos personales, matrículas y calificaciones.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" color="text.secondary">
                Accede a la información detallada de cada estudiante, historial académico y estado financiero.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <SchoolIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Profesores</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Administra la información de los profesores, incluyendo datos personales, cursos asignados y horarios.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" color="text.secondary">
                Visualiza la carga académica, evaluaciones y estadísticas de desempeño de cada profesor.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <MenuBookIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Cursos</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Gestiona los cursos ofrecidos, incluyendo información sobre prerrequisitos, créditos y programas de estudio.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" color="text.secondary">
                Organiza el contenido académico, materiales de estudio y recursos disponibles para cada curso.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <AssignmentIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Matrículas</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Administra las matrículas de los estudiantes en los diferentes cursos y secciones.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" color="text.secondary">
                Gestiona el proceso de inscripción, cambios de sección y retiros de cursos de manera eficiente.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Home;