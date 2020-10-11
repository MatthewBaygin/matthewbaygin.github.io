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
    "RА, %",
    "T2, %",
    "T3, %",
    "D250",
    "Humus, %",
    "pH",
    "Clay content",
    "Sand content",
  ],
  datasets: [
    {
      label: "Эталон",
      backgroundColor: "rgba(255,255,0, 0.5)",
      borderColor: "rgba(255,255,0, 0.9))",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,255,0,0.7)",
      hoverBorderColor: "rgba(255,255,0,1)",
      data: [0.9, 0.5, 0, 0, 0, 0, 0, 0],
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
      data: [108.23, 62.1, 52.27, 1.057, 0.47, 7.4, 16.6, 0],
      barPercentage: 1.0,
      categoryPercentage: 0.9,
    },
  ],
};

function App() {
  let chartReference = {};
  chartReference = React.createRef();
  const { register, handleSubmit } = useForm();
  const [soilType, setSoilType] = useState("");
  const [inputValue, setInputValue] = useState();
  const [dataValue, setDataValue] = useState(data);
  const onSubmit = (value) => {
    data.datasets[1].data[0] = (
      (parseFloat(value["RА, %"]) / buh) *
      100
    ).toFixed(3);
    data.datasets[1].data[1] = (
      (parseFloat(value["Т2, %"]) / rl) *
      100
    ).toFixed(3);
    data.datasets[1].data[2] = (
      (parseFloat(value["Т3, %"]) / rlgd) *
      100
    ).toFixed(3);
    data.datasets[1].data[3] = (
      (parseFloat(value["D250"]) / optic) *
      100
    ).toFixed(3);
    data.datasets[1].data[4] = (
      (parseFloat(value["Humus, %"]) / gumus) *
      100
    ).toFixed(3);
    data.datasets[1].data[5] = ((parseFloat(value["pH"]) / ph) * 100).toFixed(
      3
    );
    data.datasets[1].data[6] = (
      (parseFloat(value["Clay content"]) / glina) *
      100
    ).toFixed(3);
    data.datasets[1].data[7] = (
      (parseFloat(value["Sand content"]) / pesok) *
      100
    ).toFixed(3);

    let diff1 = (Number.parseFloat(data.datasets[1].data[6]) * glina) / 100;
    let diff2 = (Number.parseFloat(data.datasets[1].data[4]) * gumus) / 100;
    let diff3 = (Number.parseFloat(data.datasets[1].data[7]) * pesok) / 100;
    console.log("clay " + diff1);
    console.log("humus " + diff2);
    console.log("sand " + diff3);
    let idx = 0;
    let min_diff = Math.sqrt(
      Math.pow(
        Math.abs(Number.parseFloat(reference[0]["Clay content"]) - diff1),
        2
      ) +
        Math.pow(
          Math.abs(Number.parseFloat(reference[0]["Humus, %"]) - diff2),
          2
        ) +
        Math.pow(
          Math.abs(Number.parseFloat(reference[0]["Sand content"]) - diff3),
          2
        )
    );

    console.log(min_diff);
    reference.forEach((elem, index) => {
      let tmp1 = Number.parseFloat(Number.parseFloat(elem["Clay content"]));
      let tmp2 = Number.parseFloat(Number.parseFloat(elem["Humus, %"]));
      let tmp3 = Number.parseFloat(Number.parseFloat(elem["Sand content"]));
      console.log(
        Math.sqrt(
          Math.pow(Math.abs(tmp1 - diff1), 2) +
            Math.pow(Math.abs(tmp2 - diff2), 2) +
            Math.pow(Math.abs(tmp3 - diff3), 2)
        ) + elem["Тип почвы"]
      );
      if (
        min_diff >
        Math.sqrt(
          Math.pow(Math.abs(tmp1 - diff1), 2) +
            Math.pow(Math.abs(tmp2 - diff2), 2) +
            Math.pow(Math.abs(tmp3 - diff3), 2)
        )
      ) {
        min_diff = Math.sqrt(
          Math.pow(Math.abs(tmp1 - diff1), 2) +
            Math.pow(Math.abs(tmp2 - diff2), 2) +
            Math.pow(Math.abs(tmp3 - diff3), 2)
        );
        idx = index;
      }
    });
    console.log(reference[idx]);
    data.datasets[0].data[0] = (
      (parseFloat(reference[idx]["RА, %"]) / buh) *
      100
    ).toFixed(3);
    console.log(data.datasets[0].data[0]);
    data.datasets[0].data[1] = (
      (parseFloat(reference[idx]["Т2, %"]) / rl) *
      100
    ).toFixed(3);
    data.datasets[0].data[2] = (
      (parseFloat(reference[idx]["Т3, %"]) / rlgd) *
      100
    ).toFixed(3);
    data.datasets[0].data[3] = (
      (parseFloat(reference[idx]["D250"]) / optic) *
      100
    ).toFixed(3);
    data.datasets[0].data[4] = (
      (parseFloat(reference[idx]["Humus, %"]) / gumus) *
      100
    ).toFixed(3);
    data.datasets[0].data[5] = (
      (parseFloat(reference[idx]["pH"]) / ph) *
      100
    ).toFixed(3);
    data.datasets[0].data[6] = (
      (parseFloat(reference[idx]["Clay content"]) / glina) *
      100
    ).toFixed(3);
    data.datasets[0].data[7] = (
      (parseFloat(reference[idx]["Sand content"]) / pesok) *
      100
    ).toFixed(3);
    setSoilType(reference[idx]["Тип почвы"]);
    console.log(idx);
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
        <Grid item xs={12} sm={4}>
          <Form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="gridFormView"
          >
            <FormGroup>
              <label>RА, %</label>
              <input
                label="RА, %"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                type="number"
                step="0.001"
                name="RА, %"
                onChange={handleSubmit}
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Т2, %</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Т2, %"
                name="Т2, %"
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Т3, %</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Т3, %"
                name="Т3, %"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <label>D250</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="D250"
                name="D250"
                max="2"
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Humus, %</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Humus, %"
                name="Humus, %"
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
              <label>Clay content</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Clay content"
                name="Clay content"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <label>Sand content</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Sand content"
                name="Sand content"
                ref={register}
              />
            </FormGroup>
            <button type="submit" variant="outlined">
              Find
            </button>
          </Form>
        </Grid>
        <Grid item xs={12} sm={8}>
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
                      suggestedMin: 0,
                      suggestedMax: 100,
                    },
                  },
                ],
              },
            }}
          ></Bar>
          <div>
            <h1>{soilType}</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
