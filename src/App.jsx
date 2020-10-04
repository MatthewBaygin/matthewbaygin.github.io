import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Bar } from "react-chartjs-2";
import { reference } from "./reference";
import InputForm from "./InputForm";
import Grid from "@material-ui/core/Grid";
import { Form, FormInput, FormGroup } from "shards-react";
import { useForm } from "react-hook-form";
const buh = 160; // buh
const rl = 110; // rl
const rlgd = 100; // rlgd
const optic = 2; // optic
const gumus = 10; // gumus
const ph = 14; // ph
const glina = 100; // glina
const pesok = 100; // ????pesok
let data = {
  labels: [
    "Остаточная активность БуХЭ, %",
    "Остаточное свечение Т, %",
    "Остаточное свечение Т, %",
    "Значение абсорбции",
    "Содержание гумуса, %",
    "pH",
    "Процент физической глины",
    "Процент песка",
  ],
  datasets: [
    {
      label: "Эталон",
      backgroundColor: "rgba(255,255,0, 0.5)",
      borderColor: "rgba(255,255,0, 0.9))",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,255,0,0.7)",
      hoverBorderColor: "rgba(255,255,0,1)",
      data: [60, 30, 80, 70, 60, 55, 70, 70],
      barPercentage: 1.0,
      categoryPercentage: 0.9,
    },
    {
      label: "Образец",
      borderWidth: 1,
      backgroundColor: "rgba(0,191,255, 0.5)",
      borderColor: "rgba(0,191,255, 0.3))",
      hoverBackgroundColor: "rgba(0,191,255,0.7)",
      hoverBorderColor: "rgba(0,191,255,1)",
      data: [40, 59, 80, 81, 90, 90, 59, 90],
      barPercentage: 1.0,
      categoryPercentage: 0.9,
    },
  ],
};

function App() {
  let chartReference = {};
  chartReference = React.createRef();
  const { register, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState();
  const [dataValue, setDataValue] = useState(data);
  const onSubmit = (value) => {
    data.datasets[1].data[0] =
      (parseFloat(value["Остаточная активность БуХЭ, %"]) / buh) * 100;
    data.datasets[1].data[1] =
      (parseFloat(value["Остаточное свечение Т, % для Р+Л"]) / rl) * 100;
    data.datasets[1].data[2] =
      (parseFloat(value["Остаточное свечение Т, % для Р+Л+ДГ"]) / rlgd) * 100;
    data.datasets[1].data[3] =
      (parseFloat(value["Значение абсорбции"]) / optic) * 100;
    data.datasets[1].data[4] =
      (parseFloat(value["Содержание гумуса, %"]) / gumus) * 100;
    data.datasets[1].data[5] = (parseFloat(value["pH"]) / ph) * 100;
    data.datasets[1].data[6] =
      (parseFloat(value["Процент физической глины"]) / glina) * 100;
  };

  return (
    <div className="App">
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={3}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <label>Остаточная активность БуХЭ, %</label>
              <input
                label="Остаточная активность БуХЭ, %"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                type="number"
                step="0.001"
                name="Остаточная активность БуХЭ, %"
                onChange={handleSubmit}
                value={register.password}
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Остаточное свечение Т, % для Р+Л</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Остаточное свечение Т, % для Р+Л"
                name="Остаточное свечение Т, % для Р+Л"
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Остаточное свечение Т, % для Р+Л+Д</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Остаточное свечение Т, % для Р+Л+ДГ"
                name="Остаточное свечение Т, % для Р+Л+ДГ"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <label>Значение абсорбции</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Значение абсорбции"
                name="Значение абсорбции"
                max="2"
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Содержание гумуса, %</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Содержание гумуса, %"
                name="Содержание гумуса, %"
                ref={register}
              />
            </FormGroup>

            <FormGroup>
              <label>pH</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="pH"
                name="pH"
                ref={register}
              />
            </FormGroup>

            <FormGroup>
              <label>Процент физической глины</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Процент физической глины"
                name="Процент физической глины"
                ref={register}
              />
            </FormGroup>

            <button type="submit" variant="outlined" />
          </Form>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Bar
            redraw
            data={data}
            options={{
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      color: "rgba(171,171,171,1)",
                      lineWidth: 0.5,
                    },
                    stacked: true,
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: "rgba(171,171,171,1)",
                      lineWidth: 0.5,
                    },
                    stacked: false,
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          ></Bar>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
