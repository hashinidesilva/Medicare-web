import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";

const genderList = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Non-binary',
    label: 'None-binary',
  }
];

const PatientForm = (props) => {
  const {patient} = props;
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(genderList[0].value);
  const navigate = useNavigate();

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
    }
  }, [patient]);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newPatient = {
      name: name,
      age: age,
      gender: gender,
    };
    props.onAddPatient(newPatient);
  };

  return (
    <Box sx={{border: 1}}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          width: "100%",
          height: 70,
          backgroundColor: 'primary.dark',
        }}>
        <Typography mx={2} color="#FFFFFF" variant="h4">Patient Form</Typography>
      </Box>
      <Box sx={{margin: '20px'}}>
        <form onSubmit={submitHandler}>
          <Grid container direction="column" spacing={3} sx={{flexGrow: 1}}>
            <Grid item>
              <TextField
                fullWidth
                id="name"
                label="Patient name"
                type="text"
                variant="outlined"
                value={name}
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="age"
                label="Age"
                type="number"
                variant="outlined"
                value={age}
                onChange={ageChangeHandler}/>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="gender"
                select
                label="Gender"
                value={gender || genderList[0].value}
                onChange={genderChangeHandler}
              >
                {genderList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={4}>
                <Button variant="contained" type="submit">Save</Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PatientForm;